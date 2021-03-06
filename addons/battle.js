function Battle(player, skill_graphics, cursor, main, enemy_name)
{
    let battle_table = {
        height: 9,
        width: 9
    };

    let skill =
        {
            height: 0,
            width: 0,
            table: [],
            table_width: 0,
            table_height: 0,
            primary_effect: 0,
            secondary_effect: 0,
            moving: false
        };

    let player_selected_skill_id = 0;

    let player_turn = true;

    if(enemy_name === "Snake") player.hp = player.max_hp;

    let engine = new BattleEngine(battle_table);
    let enemy  = new Enemy(enemy_name);
    let graphics = new BattleGraphics(battle_table);
    let skill_activation_finished = true;
    let poison_animation_finished = true;
    let dmg_heal_number_animation_finished = true;

    player.resetRanks(player.getSkills().length);
    engine.resetPlayedSkills(player.getSkills().length);
    graphics.drawTable(battle_table);
    graphics.drawAbilityPoints(player);
    graphics.drawEndTurn();
    graphics.drawPlayerAbilities(player);
    skill_graphics.drawSkillRanks(player, true);

    engine.calculateNewTable();
    graphics.reNameIds(engine);
    graphics.startFillTable(engine);
    //graphics.reFillTable(engine);
    engine.refreshTable();
    engine.calculateEnemySkillChances(skill, enemy, player);
    graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, skill_graphics);

    console.log(enemy.armor);
    console.log(enemy.old_armor);
    graphics.updateArmor(enemy.armor, enemy.old_armor, false);


    $("#game_background").on("click", ".attack, .mana, .defense, .move, .poison, .promoted_mana, .promoted_attack, .promoted_defense, .promoted_move, .joker, .promoted_joker", function()
    {
        if(player.ap > 0 && player_turn && poison_animation_finished && skill_activation_finished && !engine.isSpecialAbilitySelected(player))
        {
            let y = ($(this).attr("id"))[2];
            let x = ($(this).attr("id"))[6];
            if(engine.allow_select && !skill.moving && !engine.isFieldStunned(parseInt(x), parseInt(y)) && !engine.isFieldParalyzed(parseInt(x), parseInt(y)))
            {
                if(!engine.selectField(y, x, player))
                {
                    if(engine.table[y][x].selected) graphics.drawSelector($(this).attr("id"));
                    else graphics.deleteSelector($(this).attr("id"));
                }
                else
                {
                    graphics.deleteSelector(engine.selected_field_id);
                    graphics.swapFields(engine).done(function()
                    {
                        player.ap--;

                        if(engine.ability_used)
                        {
                            graphics.animateDamageNumbers(0, 0, 0, player.abilities[engine.active_ability_id].mana_cost, 0, 0, 0, 0, !player_turn).done(function()
                            {
                                engine.ability_used = false;
                                dmg_heal_number_animation_finished = true;
                                graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, skill_graphics);
                            });
                        }
                        graphics.reduceManaIfAbilityUsed(engine, player);
                        graphics.refreshAbilityPoint(player);

                        if(engine.isPlayerPoisoned())
                        {
                            poison_animation_finished = false;
                            recursiveVenomClearing(graphics, engine, function()
                            {
                                poison_animation_finished = true;
                            });
                        }
                    });
                }
            }
        }
        else if(!skill.moving && !engine.isSpecialAbilitySelected(player))
        {
            graphics.shakeEndTurn();
        }

        if(skill.moving && player_turn)
        {
            if(dmg_heal_number_animation_finished && poison_animation_finished && skill_activation_finished && engine.canActivateSkill(skill, player_selected_skill_id, parseInt($(this).attr("id")[6]), parseInt($(this).attr("id")[2])))
            {
                let promoted_activision = false;
                if(engine.promotedActivition(skill, player_selected_skill_id, parseInt($(this).attr("id")[6]), parseInt($(this).attr("id")[2])))
                {
                    promoted_activision = true;
                    skill.primary_effect.dmg *= 2;
                    skill.primary_effect.heal *= 2;
                    skill.primary_effect.mana_regen *= 2;
                    skill.primary_effect.mana_drain *= 2;
                    skill.primary_effect.mana_cost *= 2;
                    skill.primary_effect.armor *= 2;
                    skill.primary_effect.penetrate *= 2;
                    skill.primary_effect.sacrifice *= 2;
                    skill.primary_effect.blood_oath *= 2;
                    skill.primary_effect.form_amount *= 2;
                    //console.log(skill.primary_effect);
                }
                stopSkillSelection(skill);
                skill_activation_finished = false;
                for(let i=0; i<skill.table_height; i++)
                {
                    for(let j=0; j<skill.table_width; j++)
                    {
                        if(skill.table[i][j] !== NUL)
                        {
                            $("#y_" + (parseInt($(this).attr("id")[2])+i).toString() + "_x_" + (parseInt($(this).attr("id")[6])+j)).remove();
                            engine.deleteField(parseInt($(this).attr("id")[6])+j, parseInt($(this).attr("id")[2])+i);
                        }
                    }
                }

                engine.resetTempTable();
                graphics.deleteSelector(engine.selected_field_id);

                dmg_heal_number_animation_finished = false;

                activatePrimarySkill(engine, graphics, skill, player, enemy, player_turn).done(function()
                {
                    engine.saveSkillChances();

                    graphics.modifyTable(engine).done(function()
                    {
                        engine.table_modified = false;
                        engine.refreshTable();
                        graphics.updateComboNumber(engine.combo_meter);

                        activateSecondarySkill(engine, graphics, skill, player, enemy, player_turn).done(function()
                        {
                            if(promoted_activision)
                            {
                                skill.primary_effect.dmg /= 2;
                                skill.primary_effect.heal /= 2;
                                skill.primary_effect.mana_regen /= 2;
                                skill.primary_effect.mana_drain /= 2;
                                skill.primary_effect.mana_cost /= 2;
                                skill.primary_effect.armor /= 2;
                                skill.primary_effect.penetrate /= 2;
                                skill.primary_effect.sacrifice /= 2;
                                skill.primary_effect.blood_oath /= 2;
                                skill.primary_effect.form_amount /= 2;
                                //console.log(skill.primary_effect);
                            }
                            engine.saveSkillChances();

                            graphics.updateComboNumber(engine.combo_meter);
                            dmg_heal_number_animation_finished = true;
                            graphics.modifyTable(engine).done(function()
                            {
                                if(!engine.isPlayerFreezed())
                                {
                                    engine.refreshTable();
                                    engine.calculateNewTable();
                                    graphics.reNameIds(engine);

                                    graphics.drawPromotedFields(engine);

                                    graphics.reFillTable(engine).done(function()
                                    {
                                        skill_activation_finished = true;
                                        engine.refreshTable();
                                        if(engine.isTherePromotion())
                                        {
                                            engine.finalizePromotions();
                                            graphics.promoteAnimation(engine).done(function()
                                            {
                                                engine.clearPromotedFields();
                                                engine.refreshTable();
                                            });
                                        }
                                        if(engine.isPlayerPoisoned())
                                        {
                                            poison_animation_finished = false;
                                            recursiveVenomClearing(graphics, engine, function()
                                            {
                                                poison_animation_finished = true;
                                            });
                                        }
                                        engine.calculateEnemySkillChances(skill, enemy, player);
                                        graphics.updateEnemySkillChances(engine.enemy_skill_chances, engine.enemy_old_skill_chances);
                                    });
                                }
                                else
                                {
                                    skill_activation_finished = true;
                                    engine.refreshTable();
                                    engine.calculateEnemySkillChances(skill, enemy, player);
                                    graphics.updateEnemySkillChances(engine.enemy_skill_chances, engine.enemy_old_skill_chances);
                                    if(engine.isPlayerPoisoned())
                                    {
                                        poison_animation_finished = false;
                                        recursiveVenomClearing(graphics, engine, function()
                                        {
                                            poison_animation_finished = true;
                                        });
                                    }
                                }



                                engine.table_modified = false;

                                engine.resetSkillToOriginalPattern(player, player_selected_skill_id);

                                player.increaseRank(player_selected_skill_id - 1, player);
                                skill_graphics.updateSkillRanks(player);
                                graphics.drawPlayerSkillBarsOnly(player, skill_graphics);
                                cursor.showCursor();
                            });

                            if(enemy.hp <= 0)
                            {
                                player.resetRanks();
                                main.winBattle();
                            }
                            else if(player.hp <= 0)
                            {
                                player.resetRanks();
                                main.looseBattle();
                            }
                        });
                    });
                });
            }
        }
    });


    $(window).keypress(function (e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
            e.preventDefault();
            //engine.logTable();
            console.log("elet: " + player.hp);
            console.log("armor: " + player.armor);
            //engine.logTempTable();
        }
    });

    $("#game_background").on("click", "#skill_1, #skill_2, #skill_3, #skill_4, #skill_5, #skill_6", function(ev)
    {
        if(player_turn && dmg_heal_number_animation_finished)
        {
            if(engine.isSpecialAbilitySelected(player))
            {

                dmg_heal_number_animation_finished = false;


                if(engine.useSpecialAbility(player, parseInt($(this).attr("id")[6])))
                {
                    graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, skill_graphics);
                    graphics.animateDamageNumbers(0, 0, 0, player.abilities[engine.active_ability_id].mana_cost, 0, 0, 0, 0,  !player_turn).done(function()
                    {
                        dmg_heal_number_animation_finished = true;
                    });
                    graphics.reduceManaIfAbilityUsed(engine, player);
                }
                else
                {
                    dmg_heal_number_animation_finished = true;
                }

            }
            else
            {
                let skill_id = $(this).attr("id");
                player_selected_skill_id = skill_id[6];

                if(player.getSkills()[player_selected_skill_id-1][0].name !== "EMPTY")
                {
                    cursor.hideCursor();
                    if(skill.moving) $("#selected_skill").remove();
                    graphics.drawSelectedSkill(player, parseInt(skill_id[6])-1, skill, player.rank[parseInt(skill_id[6])-1], false);
                    engine.addSkillValue(player, parseInt(skill_id[6])-1, skill, player.rank[parseInt(skill_id[6])-1]);

                    if(ev.pageX<960-skill.width +24 && ev.pageX>graphics.field_size/2) $("#selected_skill").css("left", ev.pageX-graphics.field_size/2);
                    else $("#selected_skill").css("left", 0);

                    if(ev.pageY<540-skill.height+24 && ev.pageY>graphics.field_size/2) $("#selected_skill").css("top",  ev.pageY-graphics.field_size/2);
                    else $("#selected_skill").css("top", 540-skill.height);

                    skill.moving = true;
                }
            }
        }
    });

    $("#game_background").on("click", ".ability_combo_detector_side, .ability_combo_detector_middle", function()
    {
        alert("kombo baby");
    });

    $("#game_background").on("click", ".ability_detector_side, .ability_detector_middle", function()
    {
        if(engine.allow_select && !engine.isSpecialAbilitySelected(player) && !skill.moving)
        {
            if(engine.selectAbility(player, $(this).attr("class")[0]))
            {
                graphics.drawAbilitySelector(engine, player);
                cursor.changeCursor(player, engine);
                if(engine.isSpecialAbilitySelected(player))
                {
                    graphics.contrastSkills();
                }
            }
        }
    });

    $("#game_background").on("click", "#exit_rank_explainer", function()
    {
        graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, skill_graphics);
        skill_graphics.removeRankHighlight();
    });

    $("#game_background").on("click", "#reset_rank", function()
    {
        if(engine.canResetSkill(player))
        {
            engine.resetRank(player);
            skill_graphics.deleteSkillRanks();
            skill_graphics.drawSkillRanks(player, true);
            graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, skill_graphics);
            skill_graphics.removeRankHighlight();
            graphics.refreshAbilityPoint(player);
        }
    });

    $("#game_background").on("mousemove", function(ev)
    {
        if(skill.moving)
        {
            if(ev.pageX<960-skill.width +24 && ev.pageX>23) $("#selected_skill").css("left", ev.pageX-23);
            if(ev.pageY<540-skill.height+24 && ev.pageY>23) $("#selected_skill").css("top",  ev.pageY-23);
        }
    });

    $("#game_background").on("contextmenu", function()
    {
        cursor.showCursor();
        if(engine.allow_select && dmg_heal_number_animation_finished)
        {
            stopSkillSelection(skill);
            engine.deSelectAbility(player);
            cursor.changeCursor(player, engine);
            graphics.deleteAbilitySelector();
        }

        return false;
    });

    $("#game_background").on("mousedown", ".attack, .mana, .defense, .move, .poison, .promoted_mana, .promoted_attack, .promoted_defense, .promoted_move", function(ev)
    {
        let right_click = 3;

        if(ev.which === right_click)
        {
            let mouse_x = (ev.pageX);
            let mouse_y = (ev.pageY);

            $("#game_background").append(graphics.drawFieldExplainer(engine.getField($(this).attr("id")[2], $(this).attr("id")[6])));

            if((mouse_y < $("#game_background").outerHeight()-$("#explain_box").outerHeight()) && (mouse_x > $("#explain_box").outerWidth()))
            {
                $("#explain_box").css(
                    {
                        "border-radius": "30px 0px 30px 30px",
                        top: mouse_y + "px",
                        left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                    });
            }
            else if(mouse_x > $("#explain_box").outerWidth())
            {
                $("#explain_box").css(
                    {
                        "border-radius": "30px 30px 0px 30px",
                        top:  (mouse_y - $("#explain_box").outerHeight()) + "px",
                        left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                    });
            }
            else $("#explain_box").remove();
        }
    });

    $("#game_background").on("mousedown", ".ability_detector_side, .ability_detector_middle", function(ev)
    {
        let right_click = 3;

        if(ev.which === right_click)
        {
            let mouse_x = (ev.pageX);
            let mouse_y = (ev.pageY);

            //alert("hey");

            //alert($(this).attr("id")[8]);
            //alert(player.getAbility($(this).attr("id")[8]));

            $("#game_background").append(graphics.drawAbilityExplainer(player.getAbility($(this).attr("class")[0])));

            if((mouse_y < $("#game_background").outerHeight()-$("#explain_box").outerHeight()) && (mouse_x > $("#explain_box").outerWidth()))
            {
                $("#explain_box").css(
                    {
                        "border-radius": "30px 0px 30px 30px",
                        top: mouse_y + "px",
                        left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                    });
            }
            else if(mouse_x > $("#explain_box").outerWidth())
            {
                $("#explain_box").css(
                    {
                        "border-radius": "30px 30px 0px 30px",
                        top:  (mouse_y - $("#explain_box").outerHeight()) + "px",
                        left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                    });
            }
            else $("#explain_box").remove();
        }
    });

    $("#game_background").on("mousedown", ".skill_right_part_bottom, .skill_left_part_bottom_left, .skill_left_part_bottom_right", function(ev)
    {
        //console.log($(this).attr("class"));
        //console.log($(this).parent().parent().attr("id"));
        //console.log($(this).parent().parent().attr("id")[6]);
        let right_click = 3;


        if(ev.which === right_click)
        {
            let mouse_x = (ev.pageX);
            let mouse_y = (ev.pageY);

            if($(this).parent().parent().attr("id").length > 7 && !engine.isSpecialAbilitySelected(player)) // if its enemy ID
            {
                if($(this).attr("class") === "skill_left_part_bottom_left")
                {
                    $("#game_background").append(skill_graphics.drawEnemyEffectExplainer(enemy, true, $(this).parent().parent().attr("id")[12]));
                }
                else if($(this).attr("class") === "skill_left_part_bottom_right")
                {
                    if(enemy.getSkills()[(parseInt($(this).parent().parent().attr("id")[12])-1)].getSkillEffect(SECONDARY).type !== NOTHING)
                    {
                        $("#game_background").append(skill_graphics.drawEnemyEffectExplainer(enemy, false, $(this).parent().parent().attr("id")[12]));
                    }
                }
                else
                {
                    $("#game_background").append(graphics.drawChanceExplainer(enemy, $(this).parent().parent().attr("id")[12]));
                }

                if(mouse_y < $("#game_background").outerHeight()-$("#explain_box").outerHeight())
                {
                    $("#explain_box").css(
                        {
                            "border-radius": "30px 0px 30px 30px",
                            top: mouse_y + "px",
                            left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                        });
                }
                else
                {
                    $("#explain_box").css(
                        {
                            "border-radius": "30px 30px 0px 30px",
                            top: (mouse_y - $("#explain_box").outerHeight()) + "px",
                            left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                        });
                }
            }
            else
            {
                if($(this).attr("class") === "skill_left_part_bottom_left")
                {
                    let skill_id = (parseInt($(this).parent().parent().attr("id")[6])-1);
                    let effect_type = NOTHING;

                    if(skill_id === -1) //amikor rankmagyarazat van
                    {
                        effect_type = player.getSkills()[player.observed_skill_id][player.observed_rank_id].getSkillEffect(PRIMARY).type;
                    }
                    else
                    {
                        effect_type = player.getSkills()[skill_id][player.rank[skill_id]].getSkillEffect(PRIMARY).type;
                    }

                    if(effect_type !== NOTHING)
                    {
                        $("#game_background").append(skill_graphics.drawPlayerEffectExplainer(player, parseInt(effect_type)));

                        if(mouse_y < $("#game_background").outerHeight()-$("#explain_box").outerHeight())
                        {
                            $("#explain_box").css(
                                {
                                    "border-radius": "0px 30px 30px 30px",
                                    top:  mouse_y + "px",
                                    left: mouse_x + "px"
                                });
                        }
                        else
                        {
                            $("#explain_box").css(
                                {
                                    "border-radius": "30px 30px 30px 0px",
                                    top:  (mouse_y - $("#explain_box").outerHeight()) + "px",
                                    left: mouse_x + "px"
                                });
                        }
                    }
                }
                else if($(this).attr("class") === "skill_left_part_bottom_right")
                {
                    let skill_id = (parseInt($(this).parent().parent().attr("id")[6])-1);
                    let effect_type = NOTHING;

                    if(skill_id === -1) //amikor rankmagyarazat van
                    {
                        effect_type = player.getSkills()[player.observed_skill_id][player.observed_rank_id].getSkillEffect(SECONDARY).type;
                    }
                    else
                    {
                        effect_type = player.getSkills()[skill_id][player.rank[skill_id]].getSkillEffect(SECONDARY).type;
                    }

                    if(effect_type !== NOTHING)
                    {
                        $("#game_background").append(skill_graphics.drawPlayerEffectExplainer(player, parseInt(effect_type)));

                        if(mouse_y < $("#game_background").outerHeight()-$("#explain_box").outerHeight())
                        {
                            $("#explain_box").css(
                                {
                                    "border-radius": "0px 30px 30px 30px",
                                    top:  mouse_y + "px",
                                    left: mouse_x + "px"
                                });
                        }
                        else
                        {
                            $("#explain_box").css(
                                {
                                    "border-radius": "30px 30px 30px 0px",
                                    top:  (mouse_y - $("#explain_box").outerHeight()) + "px",
                                    left: mouse_x + "px"
                                });
                        }
                    }
                }
            }
        }
    });

    $("#game_background").on("click", "#skill_rank_inside_0, #skill_rank_inside_1, #skill_rank_inside_2, #skill_rank_inside_3, #skill_rank_inside_4, #skill_rank_inside_5", function()
    {
        if(skill.moving === false)
        {
            skill_graphics.drawRankExplainer(parseInt(($(this).attr("id"))[18]), player.rank[parseInt(($(this).attr("id"))[18])], player);
        }
    });

    $("#game_background").on("click", "#left_arrow", function()
    {
        player.observed_rank_id--;
        skill_graphics.drawRankExplainer(player.observed_skill_id, player.observed_rank_id, player);
    });

    $("#game_background").on("click", "#right_arrow", function()
    {
        player.observed_rank_id++;
        skill_graphics.drawRankExplainer(player.observed_skill_id, player.observed_rank_id, player);
    });

    $("#game_background").on("mouseup", function()
    {
        $("#explain_box").remove();
        cursor.changeCursor(player, engine);
    });

    $("#game_background").on("click", "#end_turn", function()
    {
        //console.log(player_turn);

        if(player_turn && skill_activation_finished && poison_animation_finished && dmg_heal_number_animation_finished && !engine.isSpecialAbilitySelected(player))
        {
            player_turn = false;

            graphics.freeStunnedFields();
            graphics.freeParalyzedFields();
            engine.clearStunnedFields();
            engine.clearParalyzedFields();
            engine.resetPlayedSkills(player.getSkills().length);

            engine.refreshTable();

            if(engine.isPlayerPoisoned())
            {
                let number_of_poisons = engine.countPoisons();
                let poison_dmg = engine.activatePoisons();
                let temp_poison_dmg = poison_dmg;

                if(player.armor > 0)
                {
                    temp_poison_dmg = Math.max(0, poison_dmg - player.armor);
                    player.old_armor = player.armor;
                    player.armor = Math.max(0, player.armor - poison_dmg);
                    graphics.updateArmor(player.armor, player.old_armor, player);
                }

                player.hp -= temp_poison_dmg;
                if(player.hp < 0)
                {
                    player.hp = 0;
                }

                if(poison_dmg > 0)
                {
                    dmg_heal_number_animation_finished = false;

                    graphics.animateDamageNumbers(poison_dmg, 0, 0, 0, 0, 0, 0, 0, player_turn).done(function()
                    {
                        dmg_heal_number_animation_finished = true;
                    });

                    if(temp_poison_dmg > 0) graphics.updateHpBar($("#player_hp"), player, false);
                }

                graphics.poisonActivationAnimation(engine, number_of_poisons).done(function()
                {
                    if(engine.isPlayerFreezed())
                    {
                        engine.stopFreeze();
                        graphics.stopFreezeAnimation().done(function()
                        {
                            engine.calculateNewTable();
                            graphics.reNameIds(engine);
                            graphics.reFillTable(engine).done(function()
                            {
                                engine.refreshTable();
                                enemyTurn(graphics, engine, skill, battle_table, player, enemy, player_selected_skill_id).done(function()
                                {
                                    player_turn = true;
                                });
                            });
                        });
                    }
                    else
                    {
                        engine.calculateNewTable();
                        graphics.reNameIds(engine);
                        graphics.reFillTable(engine).done(function()
                        {
                            engine.refreshTable();
                            enemyTurn(graphics, engine, skill, battle_table, player, enemy, player_selected_skill_id).done(function()
                            {
                                player_turn = true;
                            });
                        });
                    }
                });
            }
            else
            {
                if(engine.isPlayerFreezed())
                {
                    engine.stopFreeze();
                    graphics.stopFreezeAnimation().done(function()
                    {
                        engine.calculateNewTable();
                        graphics.reNameIds(engine);
                        graphics.reFillTable(engine).done(function()
                        {
                            engine.refreshTable();
                            enemyTurn(graphics, engine, skill, battle_table, player, enemy, player_selected_skill_id).done(function()
                            {
                                player_turn = true;
                            });
                        });
                    });
                }
                else
                {
                    enemyTurn(graphics, engine, skill, battle_table, player, enemy, player_selected_skill_id).done(function()
                    {
                        player_turn = true;
                    });
                }
            }
        }
    });

    function enemyTurn(graphics, engine, skill, battle_table, player, enemy, player_selected_skill_id)
    {
        let done = $.Deferred();

        if(enemy.armor > 0)
        {
            enemy.old_armor = enemy.armor;
            enemy.armor = Math.ceil(enemy.armor / 2);
            graphics.updateArmor(enemy.armor, enemy.old_armor, false);
        }

        graphics.disableEndTurn();

        engine.decideEnemySkills();

        graphics.enemySkillSelection(engine.enemy_skill_plays).done(function()
        {
            graphics.shadowingEnemySkills(engine.enemy_skill_plays).done(function()
            {
                let i=0;

                graphics.enemysTurn(skill, player, enemy, battle_table, engine, i).done(function()
                {
                    i++;
                    graphics.enemysTurn(skill, player, enemy, battle_table, engine, i).done(function()
                    {
                        i++;
                        graphics.enemysTurn(skill, player, enemy, battle_table, engine, i).done(function()
                        {
                            i++;
                            graphics.enemysTurn(skill, player, enemy, battle_table, engine, i).done(function()
                            {
                                i++;
                                graphics.enemysTurn(skill, player, enemy, battle_table, engine, i).done(function()
                                {
                                    i++;
                                    graphics.enemysTurn(skill, player, enemy, battle_table, engine, i).done(function()
                                    {
                                        if(player.hp <= 0)
                                        {
                                            done.resolve();
                                            player.resetRanks();
                                            main.looseBattle();
                                        }
                                        else if(enemy.hp <= 0)
                                        {
                                            done.resolve();
                                            player.resetRanks();
                                            main.winBattle();
                                        }
                                        else
                                        {
                                            if(player.armor > 0)
                                            {
                                                player.old_armor = player.armor;
                                                player.armor = Math.ceil(player.armor / 2);
                                                graphics.updateArmor(player.armor, player.old_armor, true);
                                            }
                                            engine.calculateEnemySkillChances(skill, enemy, player);
                                            graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, skill_graphics);

                                            player.ap = player.max_ap;
                                            if(skill.moving)
                                            {
                                                engine.addSkillValue(player, parseInt(player_selected_skill_id)-1, skill, player.rank);
                                            }
                                            graphics.refreshAbilityPoint(player);
                                            done.resolve();
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            })
        });
        return done;
    }

    function recursiveVenomClearing(graphics, engine, cb)
    {
        graphics.clearAntiVenoms(engine).done(function()
        {
            if(engine.isThereAntiVenom()) recursiveVenomClearing(graphics, engine, cb);
            else
            {
                cb();
            }
        });
    }

    function activatePrimarySkill(engine, graphics, skill, player, enemy, player_turn)
    {
        let done = $.Deferred();
        engine.activateSkill(skill.primary_effect, player, enemy, player_turn);

        if(skill.primary_effect.dmg > 0 || skill.primary_effect.heal > 0 || skill.primary_effect.mana_regen > 0 || skill.primary_effect.mana_drain > 0 || skill.primary_effect.mana_cost > 0 || skill.primary_effect.armor > 0 || skill.primary_effect.penetrate > 0 || skill.primary_effect.sacrifice > 0 || skill.primary_effect.blood_oath > 0)
        {
            graphics.animateDamageNumbers(skill.primary_effect.dmg, skill.primary_effect.heal, skill.primary_effect.mana_regen, skill.primary_effect.mana_drain, skill.primary_effect.mana_cost, skill.primary_effect.armor, skill.primary_effect.penetrate, skill.primary_effect.sacrifice, skill.primary_effect.blood_oath, player_turn).done(function()
            {
                done.resolve();
            });
            if(skill.primary_effect.dmg > 0)
            {
                graphics.updateArmor(enemy.armor, enemy.old_armor, false);
                graphics.updateEnemyHpBar($("#enemy_hp"), enemy);
            }
            if(skill.primary_effect.sacrifice > 0)
            {
                graphics.updateArmor(player.armor, player.old_armor, true);
                graphics.updateHpBar($("#player_hp"), player);
            }
            if(skill.primary_effect.heal > 0) graphics.updateHpBar($("#player_hp"), player, false);
            if(skill.primary_effect.mana_regen > 0) graphics.updateMpBar($("#player_mp"), player, false);
            if(skill.primary_effect.mana_drain > 0)  graphics.updateEnemyMpBar($("#enemy_mp"), enemy, false);
            if(skill.primary_effect.mana_cost > 0)  graphics.updateMpBar($("#player_mp"), player, false);
            if(skill.primary_effect.armor > 0) graphics.updateArmor(player.armor, player.old_armor, true);
            if(skill.primary_effect.penetrate > 0) graphics.updateEnemyHpBar($("#enemy_hp"), enemy, true);
            if(skill.primary_effect.blood_oath > 0) graphics.updateHpBar($("#player_hp"), player);
        }
        else done.resolve();

        return done;
    }

    function activateSecondarySkill(engine, graphics, skill, player, enemy, player_turn)
    {
        let done = $.Deferred();
        engine.activateSkill(skill.secondary_effect, player, enemy, player_turn);

        if(skill.secondary_effect.dmg > 0 || skill.secondary_effect.heal > 0 || skill.secondary_effect.mana_regen > 0 || skill.secondary_effect.mana_drain > 0 || skill.secondary_effect.mana_drain > 0 || skill.secondary_effect.armor > 0 || skill.secondary_effect.penetrate > 0 || skill.secondary_effect.sacrifice > 0 || skill.secondary_effect.blood_oath > 0)
        {
            graphics.animateDamageNumbers(skill.secondary_effect.dmg, skill.secondary_effect.heal, skill.secondary_effect.mana_regen, skill.secondary_effect.mana_drain, skill.secondary_effect.mana_cost, skill.secondary_effect.armor, skill.secondary_effect.penetrate, skill.secondary_effect.sacrifice, skill.secondary_effect.blood_oath, player_turn).done(function()
            {
                done.resolve();
            });
            if(skill.secondary_effect.dmg > 0)
            {
                graphics.updateArmor(enemy.armor, enemy.old_armor, false);
                graphics.updateEnemyHpBar($("#enemy_hp"), enemy);
            }
            if(skill.secondary_effect.sacrifice > 0)
            {
                graphics.updateArmor(player.armor, player.old_armor, true);
                graphics.updateHpBar($("#player_hp"), player);
            }
            if(skill.secondary_effect.heal > 0) graphics.updateHpBar($("#player_hp"), player, false);
            if(skill.secondary_effect.mana_regen > 0)  graphics.updateMpBar($("#player_mp"), player, false);
            if(skill.secondary_effect.mana_drain > 0) graphics.updateEnemyMpBar($("#enemy_mp"), enemy, false);
            if(skill.secondary_effect.mana_cost > 0) graphics.updateMpBar($("#player_mp"), player, false);
            if(skill.secondary_effect.armor > 0) graphics.updateArmor(player.armor, player.old_armor, true);
            if(skill.secondary_effect.penetrate > 0) graphics.updateEnemyHpBar($("#enemy_hp"), enemy, true);
            if(skill.secondary_effect.blood_oath > 0) graphics.updateHpBar($("#player_hp"), player);
        }
        else done.resolve();



        return done;
    }

    function stopSkillSelection(skill)
    {
        if(skill.moving)
        {
            $("#selected_skill").remove();
            skill.moving = false;
            skill.height = 0;
            skill.width  = 0;
        }
    }
}
