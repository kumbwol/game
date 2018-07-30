$(function()
{
    start_program();

    function start_game()
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

        let engine = new BattleEngine(battle_table);
        let player = new Player("Kumbi");
        let enemy  = new Enemy("Fagyaszt");
        let graphics = new BattleGraphics(battle_table, engine, player);
        let skill_activation_finished = true;
        let poison_animation_finished = true;
        let dmg_heal_number_animation_finished = true;

        $("#create_table").on("click", function()
        {
            engine.resetRanks(player.getSkills().length);
            engine.calculateEnemySkillChances(skill, enemy);
            graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, engine.rank);
            graphics.drawTable(battle_table);
            graphics.drawAbilityPoints(player);

            engine.calculateNewTable();
            graphics.reNameIds(engine);
            graphics.startFillTable(engine);
            //graphics.reFillTable(engine);
            engine.refreshTable();
        });

        $("#game_background").on("click", ".attack, .mana, .defense, .move, .poison", function()
        {
            if(player.ap > 0 && player_turn && poison_animation_finished && skill_activation_finished)
            {
                let y = ($(this).attr("id"))[2];
                let x = ($(this).attr("id"))[6];
                if(engine.allow_select && !skill.moving && !engine.isFieldStunned(parseInt(x), parseInt(y)))
                {
                    if(!engine.selectField(y, x))
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
                            if(player.ap > 0) graphics.refreshAbilityPoint(player);
                            else graphics.drawEndTurn();

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
            else if(!skill.moving)
            {
                graphics.shakeEndTurn();
            }

            if(skill.moving && player_turn)
            {
                if(dmg_heal_number_animation_finished && poison_animation_finished && skill_activation_finished && engine.canActivateSkill(skill, parseInt($(this).attr("id")[6]), parseInt($(this).attr("id")[2])))
                {
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
                        graphics.modifyTable(engine).done(function()
                        {
                            engine.table_modified = false;
                            engine.refreshTable();

                            activateSecondarySkill(engine, graphics, skill, player, enemy, player_turn).done(function()
                            {
                                dmg_heal_number_animation_finished = true;
                                graphics.modifyTable(engine).done(function()
                                {
                                    engine.calculateEnemySkillChances(skill, enemy);
                                    graphics.updateEnemySkillChances(engine.enemy_skill_chances);
                                    if(!engine.isPlayerFreezed())
                                    {
                                        engine.refreshTable();
                                        engine.calculateNewTable();
                                        graphics.reNameIds(engine);
                                        graphics.reFillTable(engine).done(function()
                                        {
                                            skill_activation_finished = true;
                                            engine.refreshTable();
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
                                    else
                                    {
                                        skill_activation_finished = true;
                                        engine.refreshTable();
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

                                    engine.increaseRank(player_selected_skill_id - 1);
                                    graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, engine.rank);
                                });
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
                engine.logTable();
                engine.logTempTable();
            }
        });

        $("#game_background").on("click", "#skill_1, #skill_2, #skill_3, #skill_4, #skill_5, #skill_6", function(ev)
        {
            if(player_turn && dmg_heal_number_animation_finished)
            {
                if(skill.moving) $(".selected_skill").remove();
                let skill_id = $(this).attr("id");
                player_selected_skill_id = skill_id[6];

                graphics.drawSelectedSkill(player, parseInt(skill_id[6])-1, skill, engine.rank[parseInt(skill_id[6])-1]);
                engine.addSkillValue(player, parseInt(skill_id[6])-1, skill, engine.rank[parseInt(skill_id[6])-1]);

                if(ev.pageX<960-skill.width +24 && ev.pageX>graphics.field_size/2) $(".selected_skill").css("left", ev.pageX-graphics.field_size/2);
                else $(".selected_skill").css("left", 0);

                if(ev.pageY<540-skill.height+24 && ev.pageY>graphics.field_size/2) $(".selected_skill").css("top",  ev.pageY-graphics.field_size/2);
                else $(".selected_skill").css("top", 540-skill.height);

                //alert(skill.effect);

                skill.moving = true;
            }
        });


        $("#game_background").on("mousemove", function(ev)
        {
            if(skill.moving)
            {
                if(ev.pageX<960-skill.width +24 && ev.pageX>23) $(".selected_skill").css("left", ev.pageX-23);
                if(ev.pageY<540-skill.height+24 && ev.pageY>23) $(".selected_skill").css("top",  ev.pageY-23);
            }
        });

        $("#game_background").on("contextmenu", function()
        {
            stopSkillSelection(skill);
            return false;
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


                if($(this).parent().parent().attr("id").length > 7) // if its enemy ID
                {
                    if($(this).attr("class") === "skill_left_part_bottom_left")
                    {
                        $("#game_background").append(graphics.drawEffectExplainer(enemy, true, $(this).parent().parent().attr("id")[12]));
                        $("#explain_box").css(
                            {
                                "border-radius": "30px 0px 30px 30px",
                                top: mouse_y + "px",
                                left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                            });
                    }
                    else if($(this).attr("class") === "skill_left_part_bottom_right")
                    {
                        if(enemy.getSkills()[(parseInt($(this).parent().parent().attr("id")[12])-1)].getSkillEffect(SECONDARY).type !== NOTHING)
                        {
                            $("#game_background").append(graphics.drawEffectExplainer(enemy, false, $(this).parent().parent().attr("id")[12]));
                            $("#explain_box").css(
                                {
                                    "border-radius": "30px 0px 30px 30px",
                                    top: mouse_y + "px",
                                    left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                                });
                        }
                    }
                    else
                    {
                        $("#game_background").append(graphics.drawChanceExplainer(enemy, $(this).parent().parent().attr("id")[12]));
                        $("#explain_box").css(
                            {
                                "border-radius": "30px 0px 30px 30px",
                                top: mouse_y + "px",
                                left: (mouse_x-($("#explain_box").outerWidth())) + "px"
                            });
                    }
                }
                else
                {
                    if($(this).attr("class") === "skill_left_part_bottom_left")
                    {
                        $("#game_background").append(graphics.drawEffectExplainer(player, true, $(this).parent().parent().attr("id")[6]));
                        $("#explain_box").css(
                            {
                                "border-radius": "0px 30px 30px 30px",
                                top: mouse_y + "px",
                                left: mouse_x+ "px"
                            });
                    }
                    else if($(this).attr("class") === "skill_left_part_bottom_right")
                    {
                        if(player.getSkills()[(parseInt($(this).parent().parent().attr("id")[6])-1)].getSkillEffect(SECONDARY).type !== NOTHING)
                        {
                            $("#game_background").append(graphics.drawEffectExplainer(player, false, $(this).parent().parent().attr("id")[6]));
                            $("#explain_box").css(
                                {
                                    "border-radius": "0px 30px 30px 30px",
                                    top: mouse_y + "px",
                                    left: mouse_x+ "px"
                                });
                        }
                    }
                }
            }
        });


        $("#game_background").on("mouseup", function()
        {
            $("#explain_box").remove();
        });


        $("#game_background").on("click", "#end_turn", function()
        {
            graphics.freeStunnedFields();
            engine.clearSunnedFields();
            //console.log(player_turn);

            if(player_turn && skill_activation_finished && poison_animation_finished && dmg_heal_number_animation_finished)
            {
                player_turn = false;
                engine.refreshTable();

                if(engine.isPlayerPoisoned())
                {
                    let number_of_poisons = engine.countPoisons();
                    let poison_dmg = engine.activatePoisons();

                    player.hp -= poison_dmg;
                    if(player.hp < 0)
                    {
                        player.hp = 0;
                    }

                    if(poison_dmg > 0)
                    {
                        dmg_heal_number_animation_finished = false;

                        graphics.animateDamageNumbers(poison_dmg, 0, 0, false).done(function()
                        {
                            dmg_heal_number_animation_finished = true;
                        });

                        if(poison_dmg > 0) graphics.updateHpBar($("#player_hp"), player);
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
    }

    function start_program()
    {
        $.when
        (
            $.getScript("addons/battle_engine.js"),
            $.getScript("addons/battle_graphics.js"),
            $.getScript("addons/player.js"),
            $.getScript("addons/enemy.js"),
            $.getScript("addons/field.js"),
            $.getScript("addons/field_types.js"),
            $.getScript("addons/config.js"),
            $.getScript("addons/skillpattern.js"),
            $.getScript("addons/skill.js"),
            $.getScript("addons/effect_types.js"),
            $.getScript("addons/effect.js"),
            $.getScript("addons/chance_types.js"),
            $.getScript("addons/chance.js"),
            $.getScript("addons/preloader.js"),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function()
        {
            $.getScript("addons/paragraphs.js");
            start_game();
        });
    }

    function enemyTurn(graphics, engine, skill, battle_table, player, enemy, player_selected_skill_id)
    {
        let done = $.Deferred();
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
                            engine.calculateEnemySkillChances(skill, enemy);
                            graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances, engine.rank);

                            player.ap = player.max_ap;
                            if(skill.moving)
                            {
                                engine.addSkillValue(player, parseInt(player_selected_skill_id)-1, skill, engine.rank);
                            }
                            graphics.deleteEndTurn();
                            graphics.drawAbilityPoints(player);
                            done.resolve();
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

        if(skill.primary_effect.dmg > 0 || skill.primary_effect.heal > 0 || skill.primary_effect.mana_regen > 0 || skill.primary_effect.mana_drain > 0)
        {
            graphics.animateDamageNumbers(skill.primary_effect.dmg, skill.primary_effect.heal, skill.primary_effect.mana_regen, skill.primary_effect.mana_drain, player_turn).done(function()
            {
                done.resolve();
            });
            if(skill.primary_effect.dmg > 0)  graphics.updateEnemyHpBar($("#enemy_hp"), enemy);
            if(skill.primary_effect.heal > 0) graphics.updateHpBar($("#player_hp"), player);
            if(skill.primary_effect.mana_regen > 0) graphics.updateMpBar($("#player_mp"), player, false);
            if(skill.primary_effect.mana_drain > 0)  graphics.updateEnemyMpBar($("#enemy_mp"), enemy, false);
        }
        else done.resolve();

        return done;
    }

    function activateSecondarySkill(engine, graphics, skill, player, enemy, player_turn)
    {
        let done = $.Deferred();
        engine.activateSkill(skill.secondary_effect, player, enemy, player_turn);

        if(skill.secondary_effect.dmg > 0 || skill.secondary_effect.heal > 0 || skill.secondary_effect.mana_regen > 0 || skill.secondary_effect.mana_drain > 0)
        {
            graphics.animateDamageNumbers(skill.secondary_effect.dmg, skill.secondary_effect.heal, skill.secondary_effect.mana_regen, skill.secondary_effect.mana_drain, player_turn).done(function()
            {
                done.resolve();
            });
            if(skill.secondary_effect.dmg > 0)  graphics.updateEnemyHpBar($("#enemy_hp"), enemy);
            if(skill.secondary_effect.heal > 0) graphics.updateHpBar($("#player_hp"), player);
            if(skill.primary_effect.mana_regen > 0)  graphics.updateMpBar($("#player_mp"), player, false);
            if(skill.secondary_effect.mana_drain > 0) graphics.updateEnemyMpBar($("#enemy_mp"), enemy, false);
        }
        else done.resolve();

        return done;
    }

    function stopSkillSelection(skill)
    {
        if(skill.moving)
        {
            $(".selected_skill").remove();
            skill.moving = false;
            skill.height = 0;
            skill.width  = 0;
        }
    }
});