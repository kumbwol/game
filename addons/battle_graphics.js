console.log("battle_graph.js loaded");

function BattleGraphics(battle_table, engine)
{
    this.battle_table = battle_table;
    this.drawTable = drawTable;
    this.drawSelector = drawSelector;
    this.deleteSelector = deleteSelector;
    this.swapFields = swapFields;
    this.drawSkillBars = drawSkillBars;
    this.drawSelectedSkill = drawSelectedSkill;
    this.drawTopBar = drawTopBar;
    this.reFillTable = reFillTable;
    this.startFillTable = startFillTable;
    this.reNameIds = reNameIds;
    this.modifyTable = modifyTable;
    this.drawAbilityPoints = drawAbilityPoints;
    this.refreshAbilityPoint = refreshAbilityPoints;
    this.drawEndTurn = drawEndTurn;
    this.shakeEndTurn = shakeEndTurn;
    this.disableEndTurn = disableEndTurn;
    this.deleteEndTurn = deleteEndTurn;
    this.enemySkillSelection = enemySkillSelection;
    this.enemysTurn = enemysTurn;
    this.shadowingEnemySkills = shadowingEnemySkills;
    this.animateDamageNumbers = animateDamageNumbers;
    this.updateHpBar = updateHpBar;
    this.updateMpBar = updateMpBar;
    this.updateEnemyHpBar = updateEnemyHpBar;
    this.updateEnemyMpBar = updateEnemyMpBar;
    this.updateEnemySkillChances = updateEnemySkillchances;
    this.drawChanceExplainer = drawChanceExplainer;
    this.drawEffectExplainer = drawEffectExplainer;
    this.poisonActivationAnimation = poisonActivationAnimation;
    this.clearAntiVenoms = clearAntiVenoms;
    this.freeStunnedFields = freeStunnedFields;
    this.freezeAnimation = freezeAnimation;
    this.stopFreezeAnimation = stopFreezeAnimation;
    this.enemyActivatePrimarySkill = enemyActivatePrimarySkill;
    this.enemyActivateSecondarySkill = enemyActivateSecondarySkill;

    let field_size = 50;
    this.field_size = field_size;

    function stopFreezeAnimation()
    {
        let done = $.Deferred();

        let opacity = FREEZE_OPACITY;

        let x = setInterval(function()
        {
            $("#freeze").css("opacity", opacity);
            opacity -= ((FREEZE_OPACITY/FREEZE_ANIMATION_LENGTH)*10);
        }, 10);

        setTimeout(function()
        {
            clearInterval(x);
            $("#freeze").remove();
            done.resolve();
        }, FREEZE_ANIMATION_LENGTH);

        return done;
    }

    function freezeAnimation()
    {
        let done = $.Deferred();

        //$sound_object[0].get(0).play();

        $("#battle_table").append('<div id="freeze"></div>');
        let opacity = 0;

        let x = setInterval(function()
        {
            $("#freeze").css("opacity", opacity);
            opacity += ((FREEZE_OPACITY/FREEZE_ANIMATION_LENGTH)*10);
        }, 10);

        setTimeout(function()
        {
            clearInterval(x);
            /*$sound_object[0].get(0).pause();
            $sound_object[0].get(0).currentTime = 0;*/
            done.resolve();
        }, FREEZE_ANIMATION_LENGTH);


        return done;
    }

    function freeStunnedFields()
    {

        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                $("#y_" + i + "_x_" + j).removeClass("stunIt");
            }
        }

        /*let done = $.Deferred();


        done.resolve();

        return done;*/
    }

    function clearAntiVenoms(engine)
    {
        let done = $.Deferred();

        let frozen = engine.isPlayerFreezed();

        if(engine.isThereAntiVenom())
        {
            for(let i=0; i<this.battle_table.height; i++)
            {
                for(let j=0; j<this.battle_table.width; j++)
                {
                    if(engine.table[i][j].type === ANT)
                    {
                        //alert("cs");
                        engine.table[i][j].type = NUL;
                        engine.temp_table[i][j].type = NUL;
                        $("#y_" + i + "_x_" + j).remove();
                    }
                }
            }
            //alert("ok");
            if(!frozen)
            {
                engine.calculateNewTable();
                this.reNameIds(engine);
                this.reFillTable(engine).done(function()
                {
                    engine.refreshTable();
                    done.resolve();
                });
            }
            else
            {
                engine.refreshTable();
                done.resolve();
            }
        }
        else
        {
            done.resolve();
        }

        return done;
    }

    function poisonActivationAnimation(engine, number_of_poisons)
    {
        let done = $.Deferred();

        engine.logTable();

        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(engine.table[i][j].type === NUL)
                {
                    $("#y_" + i + "_x_" + j).css("z-index", 1);
                    $("#y_" + i + "_x_" + j).css("background-size", "34px");

                    $("#y_" + i + "_x_" + j).animate({
                        width: '+=8px',
                        height: '+=8px',
                        top: "-=4px",
                        left: "-=4px",
                        backgroundSize: "+=8px"
                    }, 300, function()
                    {
                        let element = $(this).attr("id");
                        number_of_poisons--;
                        $("#" + element).remove();
                        if(number_of_poisons === 0)
                        {
                            setTimeout(function()
                            {
                                done.resolve();
                            }, 100);
                        }
                    });
                }
            }
        }

        return done;
    }

    function paragraphMacroChanger(text)
    {
        text = text.replace("MOVE", '<span style="color:forestgreen; font-weight:bold">MOVE</span>');
        text = text.replace("DEFENSE", '<span style="color:bisque; font-weight:bold">DEFENSE</span>');
        text = text.replace("ATTACK", '<span style="color:crimson; font-weight:bold">ATTACK</span>');

        return text;
    }

    function drawEffectExplainer(unit, primary, id)
    {
        let x = $('<div id="explain_box">');
        if(primary)
        {
            x.append('<div class="explain_box_title">' + paragraphs.effect.titles[unit.getSkills()[(parseInt(id)-1)].getSkillEffect(PRIMARY).type] + '</div>');
            x.append('<div class="explain_box_line"></div>');
            x.append('<div class="explain_box_paragraph">' + paragraphMacroChanger(paragraphs.effect.paragraphs[unit.getSkills()[(parseInt(id)-1)].getSkillEffect(PRIMARY).type]) + '</div>');
        }
        else
        {
            x.append('<div class="explain_box_title">' + paragraphs.effect.titles[unit.getSkills()[(parseInt(id)-1)].getSkillEffect(SECONDARY).type] + '</div>');
            x.append('<div class="explain_box_line"></div>');
            x.append('<div class="explain_box_paragraph">' + paragraphMacroChanger(paragraphs.effect.paragraphs[unit.getSkills()[(parseInt(id)-1)].getSkillEffect(SECONDARY).type]) + '</div>');
        }


        return x;
    }

    function drawChanceExplainer(enemy, id)
    {
        let x = $('<div id="explain_box">');
        x.append('<div class="explain_box_title">' + paragraphs.chance.titles[enemy.getSkills()[(parseInt(id)-1)].getSkillChance().type] + '</div>');
        x.append('<div class="explain_box_line"></div>');
        x.append('<div class="explain_box_paragraph">' + paragraphMacroChanger(paragraphs.chance.paragraphs[enemy.getSkills()[(parseInt(id)-1)].getSkillChance().type]) + '</div>');

        return x;
    }


    function updateEnemySkillchances(enemy_skill_chances)
    {
        for(let i=0; i<enemy_skill_chances.length; i++)
        {
            $("#enemy_skill_"+(i+1)+ " .enemy_chance_number").text(enemy_skill_chances[i] + "%");
            allignTextRight($("#enemy_skill_" + (i+1) + " .enemy_chance_number"));
            allignToMiddleY($("#enemy_skill_" + (i+1) + " .enemy_chance_number"));
        }
    }

    function animateDamageNumbers(dmg, heal, mana_regen, mana_loss, player_on_turn)
    {
        let done = $.Deferred();

        if(dmg > 0 || heal > 0 || mana_regen > 0 || mana_loss)
        {
            let object;

            if(dmg > 0)
            {
                if(player_on_turn) $("#enemy_skeleton").append('<div id="dmg_counter"></div>');
                else $("#self").append('<div id="dmg_counter"></div>');

                object = $("#dmg_counter");
                object.css("color", "red");
                object.html("-" + dmg);
            }
            else if(heal > 0)
            {
                if(player_on_turn) $("#self").append('<div id="dmg_counter"></div>');
                else $("#enemy_skeleton").append('<div id="dmg_counter"></div>');

                object = $("#dmg_counter");
                object.css("color", "lawngreen");
                object.html("+" + heal);
            }
            else if(mana_regen > 0)
            {
                if(player_on_turn) $("#self").append('<div id="dmg_counter"></div>');
                else $("#enemy_skeleton").append('<div id="dmg_counter"></div>');

                object = $("#dmg_counter");
                object.css("color", "deepskyblue");
                object.html("+" + mana_regen);
            }
            else if(mana_loss > 0)
            {
                if(player_on_turn) $("#enemy_skeleton").append('<div id="dmg_counter"></div>');
                else $("#self").append('<div id="dmg_counter"></div>');

                object = $("#dmg_counter");
                object.css("color", "blue");
                object.html("-" + mana_loss);
            }

            allignToMiddle(object);
            allignToMiddleY(object);

            let animation_speed = "1s";

            object.css(
                {
                    "-webkit-animation-duration": animation_speed,
                    "-moz-animation-duration": animation_speed,
                    "-ms-animation-duration": animation_speed,
                    "-o-animation-duration": animation_speed,
                    "animation-duration": animation_speed
                }
            );
            object.addClass("animated bounce").one("webkitanimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function()
            {
                setTimeout(function()
                {
                    object.remove();
                    done.resolve();
                }, 200);
            });
        }
        else done.resolve();

        return done;
    }

    function shadowingEnemySkills(enemy_skill_plays)
    {
        let done = $.Deferred();

        let shadowing_needed = false;

        for(let i=0; i<enemy_skill_plays.length; i++)
        {
            if(!enemy_skill_plays[i])
            {
                $("#enemy_skill_" + (i+1)).append('<div class="shadow"></div>');
                shadowing_needed = true;
            }
        }

        if(shadowing_needed)
        {
            $(".shadow").css("height", $(".shadow").parent().outerHeight());
            $(".shadow").css("width", $(".shadow").parent().outerWidth());


            let x = setInterval(function()
            {

                $(".shadow").css("opacity", "+=0.01");

            }, 20);

            setTimeout(function()
            {
                clearInterval(x);
                done.resolve();
            }, 1000);
        }
        else
        {
            setTimeout(function()
            {
                done.resolve();
            }, 200);
        }

        return done;
    }

    function enemyActivatePrimarySkill(engine, skill, player, enemy, player_turn, id)
    {
        let done = $.Deferred();

        engine.enemyActivatePrimarySkill(skill, player, enemy, player_turn, id);

        if(engine.table_modified)
        {
            /*if(skill.effect.type == STUN)
            {
                alert("szia");
                done.resolve();
            }*/
            this.modifyTable(engine).done(function()
            {
                engine.refreshTable();
                engine.resetTempTable();
                done.resolve();
            });
        }
        else if(skill.primary_effect.type === FREEZE)
        {
            this.freezeAnimation().done(function()
            {
                done.resolve();
            });
        }
        else
        {
            setTimeout(function()
            {
                /*$("#self").append('<div id="cut"></div>');
                $("#cut").animateSprite({
                    fps: 30,
                    animations: {
                        cut: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    },
                    loop: false,
                    complete: function(){
                        $("#cut").remove();*/

                animateDamageNumbers(skill.primary_effect.dmg, skill.primary_effect.heal, skill.primary_effect.mana_regen, false).done(function()
                {
                    done.resolve();
                });

                if(skill.primary_effect.dmg > 0) updateHpBar($("#player_hp"), player);
                if(skill.primary_effect.heal > 0) updateEnemyHpBar($("#enemy_hp"), enemy);
                /*     }
                 });*/
            }, 300);
        }

        return done;
    }

    function enemyActivateSecondarySkill(engine, skill, player, enemy, player_turn, id)
    {
        let done = $.Deferred();

        engine.enemyActivateSecondarySkill(skill, player, enemy, player_turn, id);

        if(engine.table_modified)
        {
            /*if(skill.effect.type == STUN)
            {
                alert("szia");
                done.resolve();
            }*/
            modifyTable(engine).done(function()
            {
                engine.refreshTable();
                engine.resetTempTable();
                done.resolve();
            });
        }
        else if(skill.secondary_effect.type === FREEZE)
        {
            freezeAnimation().done(function()
            {
                done.resolve();
            });
        }
        else
        {
            /*$("#self").append('<div id="cut"></div>');
            $("#cut").animateSprite({
                fps: 30,
                animations: {
                    cut: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                },
                loop: false,
                complete: function(){
                    $("#cut").remove();*/

            animateDamageNumbers(skill.secondary_effect.dmg, skill.secondary_effect.heal, skill.secondary_effect.mana_regen, false).done(function()
            {
                done.resolve();
            });

            if(skill.secondary_effect.dmg > 0) updateHpBar($("#player_hp"), player);
            if(skill.secondary_effect.heal > 0) updateEnemyHpBar($("#enemy_hp"), enemy);
        }

        return done;
    }

    function enemysTurn(skill, player, enemy, battle_table, engine, i)
    {
        let done = $.Deferred();

        if(engine.enemy_skill_plays[i])
        {
            drawActiveEnemySkill(engine.enemy_skill_plays.length, i);
            let player_turn = false;

            this.enemyActivatePrimarySkill(engine, skill, player, enemy, player_turn, i).done(function()
            {

                enemyActivateSecondarySkill(engine, skill, player, enemy, player_turn, i).done(function()
                {
                    done.resolve();
                });
            });
        }
        else done.resolve();


        return done;
    }

    function drawActiveEnemySkill(number_of_skills, id)
    {
        for(let i=1; i<=number_of_skills; i++)
        {
            $("#enemy_skill_" + i).removeClass("activated");
        }
        $("#enemy_skill_" + (id+1)).addClass("activated");
    }

    function enemySkillSelection(enemy_skill_plays)
    {
        let done = $.Deferred();

        for(let i=0; i<enemy_skill_plays.length; i++)
        {
            $("#enemy_skill_" + (i+1) + " .skill_right_part_top").remove();
            $("#enemy_skill_" + (i+1) + " .skill_right_part_bottom").remove();

            if(enemy_skill_plays[i])
            {
                $("#enemy_skill_" + (i+1) + " .skill_right_part").addClass("success");
            }
            else $("#enemy_skill_" + (i+1) + " .skill_right_part").addClass("failure");
        }

        done.resolve();

        return done;
    }

    function disableEndTurn()
    {
        $("#end_turn").css("background-color", "grey");
    }

    function deleteEndTurn()
    {
        $("#end_turn").remove();
    }

    function shakeEndTurn()
    {
        let object = $("#end_turn");
        let shake_speed = "1s";
        object.css(
            {
                "-webkit-animation-duration": shake_speed,
                "-moz-animation-duration": shake_speed,
                "-ms-animation-duration": shake_speed,
                "-o-animation-duration": shake_speed,
                "animation-duration": shake_speed
            }
        );
        object.attr("class", "animated shake").one("webkitanimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function()
        {
            object.removeClass();
        });
    }

    function drawEndTurn()
    {
        $("#ability_point_bg").remove();
        $("#game_background").append('<div id="end_turn"></div>');
        $("#end_turn").css("background-color", end_turn_color);
        allignToMiddle($("#end_turn"));
        $("#end_turn").append('<div id="end_turn_string">End Turn</div>');
        allignToMiddle($("#end_turn_string"));
    }

    function drawAbilityPoints(player)
    {
        if(player.ap > 0)
        {
            $("#game_background").append('<div id="ability_point_bg"></div>');
            allignToMiddle($("#ability_point_bg"));

            refreshAbilityPoints(player);
        }
        else
        {
            this.drawEndTurn();
        }
    }

    function refreshAbilityPoints(player)
    {
        $("#ability_point").remove();
        $("#ability_point_bg").append('<div id="ability_point"></div>');
        $("#ability_point").html(player.ap);
        allignToMiddle($("#ability_point"));
        $("#ability_point").css("left", "-=1px");
    }

    function myFade(change_field_type, object, isStunned, cb)
    {
        let changed_field_type_string;
        let stunField = "";
        if(isStunned) stunField = " stunIt";

        switch(change_field_type)
        {
            case ATT:
            {
                changed_field_type_string = "attack" + stunField;
                break;
            }

            case POI:
            {
                changed_field_type_string = "poison" + stunField;
                break;
            }
        }

        let fade_speed = "0.6s";

        let class_name = object.attr("class");
        object.css(
            {
                "-webkit-animation-duration": fade_speed,
                "-moz-animation-duration": fade_speed,
                "-ms-animation-duration": fade_speed,
                "-o-animation-duration": fade_speed,
                "animation-duration": fade_speed
            }
        );
        object.attr("class", class_name + " animated fadeOut").one("webkitanimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function()
        {
            object.removeClass();
            object.attr("class", changed_field_type_string + " animated fadeIn").one("webkitanimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function()
            {
                object.removeClass();
                object.attr("class", changed_field_type_string);
                cb();
            });
        });
    }

    function stunFieldAnimation(object, cb)
    {
        setTimeout(function()
        {
            //object.css("background-color", "#2f2f2f");
            object.addClass("stunIt");
            cb();
        }, 500);
    }

    function modifyTable(engine)
    {
        let done = $.Deferred();

        let wait_animation = false;

        for(let i=0; i<engine.battle_table.height; i++)
        {
            for(let j=0; j<engine.battle_table.width; j++)
            {
                if(engine.table[i][j].type !== engine.temp_table[i][j].type && engine.table[i][j].type !== NUL)
                {
                    let changed_field_type = engine.temp_table[i][j].type;
                    wait_animation = true;

                    myFade(changed_field_type, $("#y_" + i + "_x_" + j), engine.temp_table[i][j].stunned, function()
                    {
                        done.resolve();
                    });
                }

                if(engine.table[i][j].stunned)
                {
                    wait_animation = true;
                    stunFieldAnimation($("#y_" + i + "_x_" + j), function()
                    {
                        done.resolve();
                    });
                }
            }
        }
        if(!wait_animation) done.resolve();
        return done;
    }

    function reNameIds(engine)
    {
        for(let j=0; j<engine.battle_table.width; j++)
        {
            let number_of_holes = 0;
            for(let i=engine.battle_table.height-1; i>=0; i--)
            {
                if(engine.table[i][j].type === NUL)
                {
                    number_of_holes++;
                }
                else if(number_of_holes>0)
                {
                    $("#y_" + i + "_x_" + j).attr("id", "y_" + (i+number_of_holes) + "_x_" + j);
                }
            }

            let y=0;
            for(let i=number_of_holes-1; i>=0; i--)
            {
                $("#battle_table").append(createField(("y_" + i + "_x_" + j), engine.temp_table[i][j].type, j, y-1, true));
                y--;
            }
        }
    }

    function generateRandomNumber(max_number)
    {
        return Math.floor(Math.random() * max_number);
    }

    function startFillTable(engine)
    {
        //...::: EGYENKENT ESES KEZDETKOR :::...
        /*let dropped_downs_per_column = [];

        for(let i=0; i<engine.battle_table.width; i++)
        {
            dropped_downs_per_column[i] = 0;
        }

        let quit;

        let x = setInterval(function()
        {
            quit = true;
            let random_column = generateRandomNumber(engine.battle_table.width);

            if(dropped_downs_per_column[random_column] < engine.battle_table.height)
            {
                dropped_downs_per_column[random_column]++;
                let class_name = $("#y_" + (engine.battle_table.height-dropped_downs_per_column[random_column]) + "_x_" + random_column).attr("class");
                //console.log("#y_" + (engine.battle_table.height-dropped_downs_per_column[random_column]) + "_x_" + random_column);
                $("#y_" + (engine.battle_table.height-dropped_downs_per_column[random_column]) + "_x_" + random_column).css(
                    {
                        "-webkit-animation-duration": "1.5s",
                        "-moz-animation-duration": "1.5s",
                        "-ms-animation-duration": "1.5s",
                        "-o-animation-duration": "1.5s",
                        "animation-duration": "1.5s"
                    }
                );
                $("#y_" + (engine.battle_table.height-dropped_downs_per_column[random_column]) + "_x_" + random_column).css("top", (engine.battle_table.height-dropped_downs_per_column[random_column])*(field_size+1)+1);
                $("#y_" + (engine.battle_table.height-dropped_downs_per_column[random_column]) + "_x_" + random_column).attr("class", class_name + " animated bounceInDown");
            }

            for(let i=0; i<engine.battle_table.width; i++)
            {
                if(dropped_downs_per_column[i] != engine.battle_table.height) quit = false;
            }

            if(quit)
            {
                x = clearInterval(x);
            }
        }, 20);*/


        //...::: EGYSZERRE ESES KEZDETKOR :::...
        for(let i=0; i<engine.battle_table.width; i++)
        {
            for(let j=0; j<engine.battle_table.height; j++)
            {
                let class_name = $("#y_" + j + "_x_" + i).attr("class");
                $("#y_" + j + "_x_" + i).css(
                    {
                        "-webkit-animation-duration": "1.5s",
                        "-moz-animation-duration": "1.5s",
                        "-ms-animation-duration": "1.5s",
                        "-o-animation-duration": "1.5s",
                        "animation-duration": "1.5s"
                    }
                );
                $("#y_" + j + "_x_" + i).css("top", j*(field_size+1)+1);
                $("#y_" + j + "_x_" + i).attr("class", class_name + " animated bounceInDown");
            }
        }
    }

    function reFillTable(engine)
    {
        let done = $.Deferred();
        let esesek = [];
        let count_drops = 0;

        for(let i=0; i<engine.battle_table.width; i++)
        {
            for(let j=0; j<engine.battle_table.height; j++)
            {
                esesek[j] = 0;
            }

            let height = 0;
            let id=engine.battle_table.height;

            for(let j=engine.battle_table.height-1; j>=0; j--)
            {
                if(engine.table[j][i].type === NUL)
                {
                    height++;
                }
                else
                {
                    for(let k=0; k<id; k++)
                    {
                        esesek[k]+=height;
                    }
                    id--;

                    height = 0;
                }
            }

            for(let k=0; k<id; k++)
            {
                esesek[k]+=height;
            }

            for(let j=0; j<engine.battle_table.height; j++)
            {
                if(esesek[j]>0)
                {
                    count_drops++;
                    bounceDown($("#y_" + j + "_x_" + i), esesek[j], 400).done(function()
                    {
                        count_drops--;
                        if(count_drops === 0)
                        {
                            done.resolve();
                        }
                    });
                }
            }
        }
        if(count_drops === 0)
        {
            done.resolve();
        }

        return done;
        /*for(let i=0; i<engine.battle_table.height; i++)
        {
            alert(esesek[i]);
        }*/
    }

    function bounceDown(object, height, time)
    {
        let done = $.Deferred();

        let eses = (height*(field_size+1))+8;

        let magassag = "+=" + eses + "px";

        /*object.velocity({"top": "+=200px"}, 500, function()
        {
            done.resolve();
        });*

        /*object.velocity({"top": magassag}, (time), function()
        {
            object.velocity({"top": "-=20"}, (time/3), function()
            {
                object.velocity({"top": "+=16"}, (time/3), function()
                {
                    object.velocity({"top": "-=6"}, (time/6), function()
                    {
                        object.velocity({"top": "+=2"}, (time/6), function()
                        {
                            done.resolve();
                        });
                    });
                });
            });
        });*/

        //object.css("position", "absolute");

        /*let szint = object.css("top").substring(0, object.css("top").length - 2);

        szint = (parseInt(szint) + eses);

        object.velocity({"top": (szint + "px")}, (time), function()
        {
            szint = (parseInt(szint) - 20);
            object.velocity({"top": (szint + "px")}, (time/3), function()
            {
                szint = (parseInt(szint) + 16);
                object.velocity({"top": (szint + "px")}, (time/3), function()
                {
                    szint = (parseInt(szint) - 6);
                    object.velocity({"top": (szint + "px")}, (time/6), function()
                    {
                        szint = (parseInt(szint) + 2);
                        object.velocity({"top": (szint + "px")}, (time/6), function()
                        {
                            done.resolve();
                        });
                    });
                });
            });
        });*/

        let third = time/3;
        let sixed = time/6;

        //setTimeout(function()
        //{
            object.animate({"top": magassag}, (time)).animate({"top": "-=20px"}, third).animate({"top": "+=16px"}, third).animate({"top": "-=6px"}, sixed).animate({"top": "+=2px"}, sixed, function()
            {
                done.resolve();
            });
        //}, generateRandomNumber(200));


        //console.log(object.is(".velocity-animating"));

        return done;
    }

    function drawTopBar()
    {
        $("#game_background").append('<div class="top_bar"></div>');
    }

    function drawSelectedSkill(player, skill_id, skill)
    {
        $("#game_background").append('<div class="selected_skill"></div>');
        for(let i=0; i<player.getSkills()[skill_id].getSkillPatternHeight(); i++)
        {
            for(let j=0; j<player.getSkills()[skill_id].getSkillPatternWidth(); j++)
            {
                let row_id = "y_" + i;
                let column_id = row_id + "_x_" + j;
                $(".selected_skill").append(createField(column_id, player.getSkills()[skill_id].getSkillPatternValue(j, i), j, i, false));
            }
        }
        skill.height = player.getSkills()[skill_id].getSkillPatternHeight()*(field_size+1) + 1;
        skill.width  = player.getSkills()[skill_id].getSkillPatternWidth()*(field_size+1)  + 1;
    }

    function drawSkillBars(player, enemy, enemy_skill_chances)
    {
        $("#player_profile").remove();
        $("#enemy_profile").remove();
        drawSkillBarPlayer(player);
        drawSkillBarEnemy(enemy, enemy_skill_chances);
    }

    function drawSkillBarPlayer(player)
    {
        $("#game_background").append('<div class="profile" id="player_profile"></div>');

        $("#player_profile").append('<div class="hp_background" id="player_hp_background"</div>');
        $("#player_profile").append('<div class="hp" id="player_hp"></div>');
        updateHpBar($("#player_hp"), player);
        $("#player_hp_background").append('<div class="hp_string" id="player_hp_string"></div>');
        $("#player_hp_string").html(player.hp + "/" + player.max_hp);
        allignToMiddle("#player_hp_string");

        $("#player_profile").append('<div class="mp_background" id="player_mp_background"</div>');
        $("#player_profile").append('<div class="mp" id="player_mp"></div>');
        updateMpBar($("#player_mp"), player, true);
        $("#player_mp_background").append('<div class="mp_string" id="player_mp_string"></div>');
        $("#player_mp_string").html(player.mp + "/" + player.max_mp);
        allignToMiddle("#player_mp_string");

        $("#player_profile").append('<div class="name" id="player_name"></div>');
        $("#player_name").append('<div class="name_string" id="player_name_string"></div>');
        $("#player_name_string").html(player.name);
        allignToMiddle("#player_name_string");

        $("#player_profile").append('<div class="profile_picture" id="self"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_1"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_2"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_3"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_4"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_5"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_6"></div>');
        createPlayerSkills(player);
    }

    function drawSkillBarEnemy(enemy, enemy_skill_chances)
    {
        $("#game_background").append('<div class="profile" id="enemy_profile"></div>');

        $("#enemy_profile").append('<div class="hp_background" id="enemy_hp_background"></div>');
        $("#enemy_profile").append('<div class="hp" id="enemy_hp"></div>');
        updateEnemyHpBar($("#enemy_hp"), enemy);
        $("#enemy_hp_background").append('<div class="hp_string" id="enemy_hp_string"></div>');
        $("#enemy_hp_string").html(enemy.hp + "/" + enemy.max_hp);
        allignToMiddle("#enemy_hp_string");

        $("#enemy_profile").append('<div class="mp_background" id="enemy_mp_background"</div>');
        $("#enemy_profile").append('<div class="mp" id="enemy_mp"></div>');
        updateEnemyMpBar($("#enemy_mp"), enemy, true);
        $("#enemy_mp_background").append('<div class="mp_string" id="enemy_mp_string"></div>');
        $("#enemy_mp_string").html(enemy.mp + "/" + enemy.max_mp);
        allignToMiddle("#enemy_mp_string");


        $("#enemy_profile").append('<div class="name" id="enemy_name"></div>');
        $("#enemy_name").append('<div class="name_string" id="enemy_name_string"></div>');
        $("#enemy_name_string").html(enemy.name);
        allignToMiddle("#enemy_name_string");
        $("#enemy_profile").append('<div class="profile_picture" id="enemy_skeleton"></div>');
        $("#enemy_profile").append('<div class="active_skill" id="enemy_skill_1"></div>');
        $("#enemy_profile").append('<div class="active_skill" id="enemy_skill_2"></div>');
        $("#enemy_profile").append('<div class="active_skill" id="enemy_skill_3"></div>');
        $("#enemy_profile").append('<div class="active_skill" id="enemy_skill_4"></div>');
        $("#enemy_profile").append('<div class="active_skill" id="enemy_skill_5"></div>');
        $("#enemy_profile").append('<div class="active_skill" id="enemy_skill_6"></div>');


        $("#enemy_skill_1").append('<div class="skill_chance" id="enemy_skill_chance_1"></div>');
        $("#enemy_skill_2").append('<div class="skill_chance" id="enemy_skill_chance_2"></div>');
        $("#enemy_skill_3").append('<div class="skill_chance" id="enemy_skill_chance_3"></div>');



        createEnemySkills(enemy, enemy_skill_chances);
    }

    function createEnemySkills(enemy, enemy_skill_chances)
    {
        drawEnemySkillChances(enemy_skill_chances);
        drawEnemyChanceTypes(enemy);
        createEnemySkillName(enemy);
        createEnemySkillEffects(enemy);
    }

    function createEnemySkillEffects(enemy)
    {
        drawEnemySkillEffects(enemy, true);
        drawEnemySkillEffects(enemy, false);
    }

    function createEnemySkillName(enemy)
    {
        for(let i=0; i<enemy.getSkills().length; i++)
        {
            $("#enemy_skill_" + (i+1) + " .skill_left_part_top").append('<div class="skill_name_string"></div>');
            let class_selector = "#enemy_skill_" + (i+1) + " .skill_name_string";
            $(class_selector).html(enemy.getSkills()[i].name);
        }
    }

    function drawEnemySkillChances(enemy_skill_chances)
    {
        for(let i=0; i<enemy_skill_chances.length; i++)
        {
            $("#enemy_skill_"+(i+1)).append('<div class="skill_left_part_top"></div>');
            $("#enemy_skill_"+(i+1)).append('<div class="skill_left_part_bottom"></div>');

            $("#enemy_skill_" + (i+1) + " .skill_left_part_bottom").append('<div class="skill_left_part_bottom_left"></div>');
            $("#enemy_skill_" + (i+1) + " .skill_left_part_bottom_left").append('<div class="skill_left_part_bottom_left_image"></div>');
            $("#enemy_skill_" + (i+1) + " .skill_left_part_bottom_left").append('<div class="skill_left_part_bottom_left_number"></div>');
            //$("#skill_" + (i+1) + " .skill_left_part_bottom_left").css("background-image", 'url("addons/images/skill_effects/dmg.png")');

            $("#enemy_skill_" + (i+1) + " .skill_left_part_bottom").append('<div class="skill_left_part_bottom_right"></div>');
            $("#enemy_skill_" + (i+1) + " .skill_left_part_bottom_right").append('<div class="skill_left_part_bottom_right_image"></div>');
            $("#enemy_skill_" + (i+1) + " .skill_left_part_bottom_right").append('<div class="skill_left_part_bottom_right_number"></div>');
            //$("#skill_" + (i+1) + " .skill_left_part_bottom_right").css("background-image", 'url("addons/images/skill_effects/dmg.png")');

            $("#enemy_skill_"+(i+1)).append('<div class="skill_right_part"></div>');

            $("#enemy_skill_"+(i+1)+" .skill_right_part").append('<div class="skill_right_part_top"></div>');
            $("#enemy_skill_"+(i+1)+" .skill_right_part").append('<div class="skill_right_part_bottom"></div>');

            $("#enemy_skill_"+(i+1)+ " .skill_right_part_top").append('<div class="enemy_chance_number"></div>');
            $("#enemy_skill_"+(i+1)+ " .enemy_chance_number").text(enemy_skill_chances[i] + "%");
            allignTextRight($("#enemy_skill_" + (i+1) + " .enemy_chance_number"));
            allignToMiddleY($("#enemy_skill_" + (i+1) + " .enemy_chance_number"));

            /*$("#skill_" + (i+1) + " .skill_left_part_bottom_left_image").css("background-image", 'url("addons/images/skill_effects/dmg.png")');
            $("#skill_" + (i+1) + " .skill_left_part_bottom_left_number").append('<div class="effect_number"></div>');
            $("#skill_" + (i+1) + " .skill_left_part_bottom_left_number .effect_number").text(player.getSkills()[i].getSkillEffect().dmg);
            allignTextRight($("#skill_" + (i+1) + " .effect_number"));
            allignToMiddleY($("#skill_" + (i+1) + " .effect_number"));*/
        }
    }

    function drawEnemyChanceTypes(enemy)
    {
        for(let i=0; i<enemy.getSkills().length; i++)
        {
            $("#enemy_skill_" + (i+1) + " .skill_right_part_bottom").css("background-repeat", "no-repeat");
            switch(enemy.getSkills()[i].getSkillChance().type)
            {
                case RAGE:
                {
                    $("#enemy_skill_" + (i+1) + " .skill_right_part_bottom").addClass("RAGE");
                    break;
                }

                case LUCK:
                {

                    $("#enemy_skill_" + (i+1) + " .skill_right_part_bottom").addClass("LUCK");
                    break;
                }
            }
        }
    }

    function createPlayerSkills(player)
    {
        createSkillPattern(player);
        createSkillName(player);
        createSkillEffects(player);
    }

    function createSkillName(player)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {
            $("#skill_" + (i+1) + " .skill_left_part_top").append('<div class="skill_name_string"></div>');
            let class_selector = "#skill_" + (i+1) + " .skill_name_string";
            $(class_selector).html(player.getSkills()[i].name);
        }
    }

    function createSkillEffects(player)
    {
        drawPlayerSkillEffects(player, true);
        drawPlayerSkillEffects(player, false);
    }

    function drawPlayerSkillEffects(player, primary)
    {
        let selector = "";
        let effect_type = 0;
        let prim_or_second = -1;

        for(let i=0; i<player.getSkills().length; i++)
        {
            if(primary)
            {
                selector = " .skill_left_part_bottom_left";
                effect_type = player.getSkills()[i].getSkillEffect(PRIMARY).type;
                prim_or_second = PRIMARY;
            }
            else
            {
                selector = " .skill_left_part_bottom_right";
                effect_type = player.getSkills()[i].getSkillEffect(SECONDARY).type;
                prim_or_second = SECONDARY;
            }

            switch(effect_type)
            {
                case DMG:
                {
                    $("#skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/dmg.png")');
                    $("#skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#skill_" + (i+1) + selector + "_number .effect_number").text(player.getSkills()[i].getSkillEffect(prim_or_second).dmg);
                    allignTextRight($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case HEAL:
                {
                    $("#skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/heal.png")');
                    $("#skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#skill_" + (i+1) + selector + "_number .effect_number").text(player.getSkills()[i].getSkillEffect(prim_or_second).heal);
                    allignTextRight($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case SHADOWFORM:
                {
                    $("#skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/shadowform.png")');
                    $("#skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    //$("#skill_" + (i+1) + " .skill_left_part_bottom_left_number .effect_number").text(player.getSkills()[i].getSkillEffect().heal);
                    allignTextRight($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case POISON:
                {
                    $("#skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/poison.png")');
                    $("#skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#skill_" + (i+1) + selector + "_number .effect_number").text(player.getSkills()[i].getSkillEffect(prim_or_second).poison_amount);
                    allignTextRight($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case POISON_DMG:
                {
                    $("#skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/poison_dmg.png")');
                    $("#skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#skill_" + (i+1) + selector + "_number .effect_number").text(player.getSkills()[i].getSkillEffect(prim_or_second).poison_dmg);
                    allignTextRight($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case MANA_REGEN:
                {
                    $("#skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/regen.png")');
                    $("#skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#skill_" + (i+1) + selector + "_number .effect_number").text(player.getSkills()[i].getSkillEffect(prim_or_second).mana_regen);
                    allignTextRight($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case MANA_LOSS:
                {
                    $("#skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/loss.png")');
                    $("#skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#skill_" + (i+1) + selector + "_number .effect_number").text(player.getSkills()[i].getSkillEffect(prim_or_second).mana_loss);
                    allignTextRight($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }
            }
        }
    }

    function drawEnemySkillEffects(enemy, primary)
    {
        let selector = "";
        let effect_type = 0;
        let prim_or_second = -1;

        for(let i=0; i<enemy.getSkills().length; i++)
        {
            if(primary)
            {
                selector = " .skill_left_part_bottom_left";
                effect_type = enemy.getSkills()[i].getSkillEffect(PRIMARY).type;
                prim_or_second = PRIMARY;
            }
            else
            {
                selector = " .skill_left_part_bottom_right";
                effect_type = enemy.getSkills()[i].getSkillEffect(SECONDARY).type;
                prim_or_second = SECONDARY;
            }

            switch(effect_type)
            {
                case DMG:
                {
                    $("#enemy_skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/dmg.png")');
                    $("#enemy_skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#enemy_skill_" + (i+1) + selector + "_number .effect_number").text(enemy.getSkills()[i].getSkillEffect(prim_or_second).dmg);
                    allignTextRight($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case HEAL:
                {
                    $("#enemy_skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/heal.png")');
                    $("#enemy_skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#enemy_skill_" + (i+1) + selector + "_number .effect_number").text(enemy.getSkills()[i].getSkillEffect(prim_or_second).heal);
                    allignTextRight($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case SHADOWFORM:
                {
                    $("#enemy_skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/shadowform.png")');
                    $("#enemy_skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    //$("#skill_" + (i+1) + " .skill_left_part_bottom_left_number .effect_number").text(player.getSkills()[i].getSkillEffect().heal);
                    allignTextRight($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case POISON:
                {
                    $("#enemy_skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/poison.png")');
                    $("#enemy_skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#enemy_skill_" + (i+1) + selector + "_number .effect_number").text(enemy.getSkills()[i].getSkillEffect(prim_or_second).poison_amount);
                    allignTextRight($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case POISON_DMG:
                {
                    $("#enemy_skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/poison_dmg.png")');
                    $("#enemy_skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#enemy_skill_" + (i+1) + selector + "_number .effect_number").text(enemy.getSkills()[i].getSkillEffect(prim_or_second).poison_dmg);
                    allignTextRight($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }

                case STUN:
                {
                    $("#enemy_skill_" + (i+1) + selector + "_image").css("background-image", 'url("addons/images/skill_effects/stun.png")');
                    $("#enemy_skill_" + (i+1) + selector + "_number").append('<div class="effect_number"></div>');
                    $("#enemy_skill_" + (i+1) + selector + "_number .effect_number").text(enemy.getSkills()[i].getSkillEffect(prim_or_second).stun_amount);
                    allignTextRight($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    allignToMiddleY($("#enemy_skill_" + (i+1) + selector + "_number .effect_number"));
                    break;
                }
            }
        }
    }

    function allignTextRight(object)
    {
        let object_width = $(object).outerWidth();
        let parent_object_width = $(object).parent().outerWidth();

        $(object).css("left", (parent_object_width-object_width) - 2);
    }

    function createSkillPattern(player)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {
            $("#skill_"+(i+1)).append('<div class="skill_left_part_top"></div>');
            $("#skill_"+(i+1)).append('<div class="skill_left_part_bottom"></div>');

            $("#skill_" + (i+1) + " .skill_left_part_bottom").append('<div class="skill_left_part_bottom_left"></div>');
            $("#skill_" + (i+1) + " .skill_left_part_bottom_left").append('<div class="skill_left_part_bottom_left_image"></div>');
            $("#skill_" + (i+1) + " .skill_left_part_bottom_left").append('<div class="skill_left_part_bottom_left_number"></div>');
            //$("#skill_" + (i+1) + " .skill_left_part_bottom_left").css("background-image", 'url("addons/images/skill_effects/dmg.png")');

            $("#skill_" + (i+1) + " .skill_left_part_bottom").append('<div class="skill_left_part_bottom_right"></div>');
            $("#skill_" + (i+1) + " .skill_left_part_bottom_right").append('<div class="skill_left_part_bottom_right_image"></div>');
            $("#skill_" + (i+1) + " .skill_left_part_bottom_right").append('<div class="skill_left_part_bottom_right_number"></div>');
            //$("#skill_" + (i+1) + " .skill_left_part_bottom_right").css("background-image", 'url("addons/images/skill_effects/dmg.png")');

            $("#skill_"+(i+1)).append('<div class="skill_right_part"></div>');

            //alert(("#skill_" + (i+1) + " .skill_right_part"));

            $("#skill_" + (i+1) + " .skill_right_part").append('<table class="skill_pattern_table"></table>');
            let table_selector = "#skill_" + (i+1) + " .skill_pattern_table";
            for(let j=0; j<player.getSkills()[i].getSkillPatternHeight(); j++)
            {
                $(table_selector).append(createRow("skill_pattern_row" + j));
                let row_selector = table_selector + " .skill_pattern_row" + j;
                for(let k=0; k<player.getSkills()[i].getSkillPatternWidth(); k++)
                {
                    $(row_selector).append(createColumn("skill_pattern_column" + k +j));
                    //alert(player.getSkills()[i].getSkillPatternValue(k,j));
                    switch(player.getSkills()[i].getSkillPatternValue(k,j))
                    {
                        case NUL:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("border", "none");
                            break;
                        }

                        case ATT:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "crimson");
                            break;
                        }

                        case MAN:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "aqua");
                            break;
                        }

                        case DEF:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "bisque");
                            break;
                        }

                        case MOV:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "forestgreen");
                            break;
                        }
                    }
                }
            }
            allignSkillPatternTable($(table_selector));
        }
    }

    function allignSkillPatternTable(object)
    {
        allignToVerticalMiddle(object);
        allignToMiddle(object);
        let x = (object).css("left");
        x = parseInt(x.replace("px", ""));
        x -= 1;
        object.css("left", x);
    }

    function swapFields(engine)
    {
        let done = $.Deferred();
        let in_place = 0;
        engine.allow_select = false;
        //alert(engine.selected_fields.y0 + " " + engine.selected_fields.x0 + " " + engine.selected_fields.y1 + " " + engine.selected_fields.x1);
        let field_id =
        {
            first: "y_" + engine.selected_fields.y0 + "_x_" + engine.selected_fields.x0,
            second: "y_" + engine.selected_fields.y1 + "_x_" + engine.selected_fields.x1
        };

        let field_pos =
        {
            first: $("#" + field_id.first).position(),
            second: $("#" + field_id.second).position()
        };

        $("#" + field_id.first).css("z-index", 1);
        $("#" + field_id.second).css("z-index", 1);

        $("#" + field_id.first).animate({"top": field_pos.second.top, "left": field_pos.second.left}, SWAP_ANIMATION_SPEED, function()
        {
            in_place++;
            engine.selected_fields.y0 = -1;
            engine.selected_fields.x0 = -1;
            engine.selected_fields.y1 = -1;
            engine.selected_fields.x1 = -1;
            $("#" + field_id.first).css("z-index", 0);
            engine.allow_select = true;
            if(in_place === 2) done.resolve();
        });
        $("#" + field_id.second).animate({"top": field_pos.first.top, "left": field_pos.first.left}, SWAP_ANIMATION_SPEED, function()
        {
            in_place++;
            engine.selected_fields.y0 = -1;
            engine.selected_fields.x0 = -1;
            engine.selected_fields.y1 = -1;
            engine.selected_fields.x1 = -1;
            $("#" + field_id.second).css("z-index", 0);
            engine.allow_select = true;
            if(in_place === 2) done.resolve();
        });

        $("#" + field_id.first).attr("id", "temp1");
        $("#" + field_id.second).attr("id", "temp2");
        $("#temp1").attr("id", field_id.second);
        $("#temp2").attr("id", field_id.first);

        return done;
    }

    function allignToMiddle(object)
    {
        let object_width = $(object).outerWidth();
        let parent_object_width = $(object).parent().outerWidth();

        $(object).css("left", (parent_object_width-object_width)/2);
    }

    function allignToMiddleY(object)
    {
        let object_height = $(object).outerHeight();
        let parent_object_height = $(object).parent().outerHeight();

        $(object).css("top", (parent_object_height-object_height)/2);
    }

    function allignToVerticalMiddle(object)
    {
        let object_height = $(object).outerHeight();
        let parent_object_height = $(object).parent().outerHeight();

        $(object).css("top", (parent_object_height-object_height)/2-1);
    }

    function drawTable()
    {
        $("#game_background").append('<div id="battle_table"></div>');
        $("#battle_table").css("width",  (this.battle_table.width*(field_size+2))  - this.battle_table.width + 1);
        $("#battle_table").css("height", (this.battle_table.height*(field_size+2)) - this.battle_table.height + 1);

        allignToMiddle($("#battle_table"));

        /*for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                let row_id = "y_" + i;
                let column_id = row_id + "_x_" + j;
                $("#battle_table").append(createField(column_id, getType(i, j, engine), j, i, true));
            }
        }*/
    }

    function drawSelector(id)
    {
        let $object = $("#" + id);
        let current_bg = $object.css("background-image");
        $object.css("background-image", current_bg + "," + 'url("addons/images/selector.gif")');
    }

    function deleteSelector(id)
    {
        if(id !== "")
        {
            let $object = $("#" + id);
            /*let current_bg = $object.css("background-image");
            let new_bg = "";
            for(let i=0; i<current_bg.length; i++)
            {
                if(current_bg[i] == ",") break;
                else new_bg += current_bg[i];
            }
            $object.css("background-image", new_bg);*/
            $object.css("background-image", "");
        }
    }

    function createRow(class_name)
    {
        let $object = $('<tr></tr>');
        $object.attr('class', class_name);
        return $object;
    }

    function createColumn(class_name)
    {
        let $object = $('<td></td>');
        $object.attr('class', class_name);
        return $object;
    }

    function createField(id, type, x, y, animated)
    {
        let $object  = $('<div></div>');
        if(animated) $object.attr('id', id);
        else $object.attr('id', id+"skill");

        $object.css("width",  field_size);
        $object.css("height", field_size);
        $object.css('position', 'absolute');
        $object.css('left', (x*(field_size+2))-x+1);
        $object.css('top',  (y*(field_size+2))-y+1);
        switch(type)
        {
            case NUL:
            {
                $object.attr('class', "nul");
                break;
            }

            case MAN:
            {
                $object.attr('class', "mana");
                break;
            }

            case ATT:
            {
                $object.attr('class', "attack");
                break;
            }

            case DEF:
            {
                $object.attr('class', "defense");
                break;
            }

            case MOV:
            {
                $object.attr('class', "move");
                break;
            }

            case POI:
            {
                $object.attr('class', "poison");
                break;
            }
        }
        return $object;
    }

    function getType(y, x, engine)
    {
        return engine.table[y][x].type;
    }

    function updateHpBar(object, player)
    {
        let full_old_hp = $("#player_hp_string").text();
        let old_hp = "";
        for(let i=0; i<full_old_hp.length; i++)
        {
            if(full_old_hp[i] == "/") break;
            else old_hp += full_old_hp[i];
        }

        if(old_hp == "") old_hp = 0;

        let new_hp = player.hp;


        if(old_hp == 0)
        {
            object.css("width", (player.hp/player.max_hp) * object.parent().width() - 1);
            $("#player_hp_string").html(player.hp + "/" + player.max_hp);
            allignToMiddle("#player_hp_string");
        }
        else
        {
            object.parent().append('<div class="hp_loosing_background"></div>');
            $(".hp_loosing_background").css("width", (parseInt(old_hp)/player.max_hp) * object.parent().width() - 1);

            let animation_speed = 30;
            let difference = 0;
            let dmg;
            if(parseInt(old_hp) - new_hp > 0)
            {
                difference = parseInt(old_hp) - new_hp;
                dmg = true;
            }
            else
            {
                difference = new_hp - parseInt(old_hp);
                dmg = false;
                $(".hp_loosing_background").css("background-color", "lightgreen");
                $(".hp_loosing_background").css("width", (new_hp/player.max_hp) * object.parent().width() - 1);
            }

            if(difference > 0)
            {
                let smoother = difference/20;

                let i = 0;

                let x = setInterval(function()
                {
                    if(dmg)
                    {
                        object.css("width", ((parseInt(old_hp)-i)/player.max_hp) * object.parent().width() - 1);
                        if(Math.floor((parseInt(old_hp)-i)) > 0)
                        {
                            $("#player_hp_string").html(Math.floor((parseInt(old_hp)-i)) + "/" + player.max_hp);
                        }
                        else $("#player_hp_string").html(0 + "/" + player.max_hp);
                    }
                    else
                    {
                        object.css("width", ((parseInt(old_hp)+i)/player.max_hp) * object.parent().width() - 1);
                        if(Math.ceil((parseInt(old_hp)+i)) <= player.max_hp)
                        {
                            $("#player_hp_string").html(Math.ceil((parseInt(old_hp)+i)) + "/" + player.max_hp);
                        }
                        else $("#player_hp_string").html(player.max_hp + "/" + player.max_hp);
                    }

                    allignToMiddle("#player_hp_string");
                    i += smoother;
                    //console.log(i);

                    if(i>difference)
                    {
                        clearInterval(x);
                        if(player.hp === 0) object.remove();
                        if(player.hp === player.max_hp) object.css("width", (player.max_hp/player.max_hp) * object.parent().width() - 1);

                        i = 0;
                        let y = setInterval(function()
                        {
                            $(".hp_loosing_background").css("width", ((old_hp-i)/player.max_hp) * $(".hp_loosing_background").parent().width() - 1);
                            i += smoother;

                            if(i>difference)
                            {
                                clearInterval(y);
                                $(".hp_loosing_background").remove();
                            }
                        }, animation_speed/2);
                    }
                }, animation_speed);
            }
        }
    }

    function updateEnemyHpBar(object, enemy)
    {
        let full_old_hp = $("#enemy_hp_string").text();
        let old_hp = "";
        for(let i=0; i<full_old_hp.length; i++)
        {
            if(full_old_hp[i] == "/") break;
            else old_hp += full_old_hp[i];
        }

        if(old_hp == "") old_hp = 0;

        let new_hp = enemy.hp;

        if(old_hp == 0)
        {
            object.css("width", (enemy.hp/enemy.max_hp) * object.parent().width() - 1);
            $("#enemy_hp_string").html(enemy.hp + "/" + enemy.max_hp);
            allignToMiddle("#enemy_hp_string");
        }
        else
        {
            object.parent().append('<div class="hp_loosing_background"></div>');
            $(".hp_loosing_background").css("width", (parseInt(old_hp)/enemy.max_hp) * object.parent().width() - 1);

            let animation_speed = 30;
            let difference = 0;
            let dmg;
            if(parseInt(old_hp) - new_hp > 0)
            {
                difference = parseInt(old_hp) - new_hp;
                dmg = true;
            }
            else
            {
                difference = new_hp - parseInt(old_hp);
                dmg = false;
                $(".hp_loosing_background").css("background-color", "lightgreen");
                $(".hp_loosing_background").css("width", (new_hp/enemy.max_hp) * object.parent().width() - 1);
            }


            //alert(((parseInt(new_hp))/enemy.max_hp) * object.parent().width() - 1);
            if(difference > 0)
            {
                let smoother = difference/20;

                //alert(animation_speed/(difference*smoother)*2);

                let i = 0;

                let x = setInterval(function()
                {
                    if(dmg)
                    {
                        object.css("width", ((parseInt(old_hp)-i)/enemy.max_hp) * object.parent().width() - 1);
                        if(Math.floor((parseInt(old_hp)-i)) > 0)
                        {
                            $("#enemy_hp_string").html(Math.floor((parseInt(old_hp)-i)) + "/" + enemy.max_hp);
                        }
                        else $("#enemy_hp_string").html(0 + "/" + enemy.max_hp);
                    }
                    else
                    {
                        object.css("width", ((parseInt(old_hp)+i)/enemy.max_hp) * object.parent().width() - 1);
                        if(Math.ceil((parseInt(old_hp)+i)) <= enemy.max_hp)
                        {
                            $("#enemy_hp_string").html(Math.ceil((parseInt(old_hp)+i)) + "/" + enemy.max_hp);
                        }
                        else $("#enemy_hp_string").html(enemy.max_hp + "/" + enemy.max_hp);
                    }

                    allignToMiddle("#enemy_hp_string");
                    i += smoother;
                    //console.log(i);

                    if(i>difference)
                    {
                        clearInterval(x);
                        if(enemy.hp === 0) object.remove();
                        if(enemy.hp === enemy.max_hp) object.css("width", (enemy.max_hp/enemy.max_hp) * object.parent().width() - 1);

                        i = 0;
                        let y = setInterval(function()
                        {
                            $(".hp_loosing_background").css("width", ((old_hp-i)/enemy.max_hp) * $(".hp_loosing_background").parent().width() - 1);
                            i += smoother;

                            if(i>difference)
                            {
                                clearInterval(y);
                                $(".hp_loosing_background").remove();
                            }
                        }, animation_speed/2);
                    }
                }, animation_speed);
            }
        }
    }

    function updateMpBar(object, player, first_time)
    {
        let full_old_mp = $("#player_mp_string").text();
        let old_mp = "";
        for(let i=0; i<full_old_mp.length; i++)
        {
            if(full_old_mp[i] == "/") break;
            else old_mp += full_old_mp[i];
        }

        if(old_mp == "") old_mp = 0;

        let new_mp = player.mp;

        if(first_time)
        {
            object.css("width", (player.mp/player.max_mp) * object.parent().width() - 1);
            $("#player_mp_string").html(player.mp + "/" + player.max_mp);
            allignToMiddle("#player_mp_string");
        }
        else
        {
            object.parent().append('<div class="mp_loosing_background"></div>');
            $(".mp_loosing_background").css("width", (parseInt(old_mp)/player.max_mp) * object.parent().width() - 1);

            let animation_speed = 30;
            let difference = 0;
            let dmg;
            if(parseInt(old_mp) - new_mp > 0)
            {
                difference = parseInt(old_mp) - new_mp;
                dmg = true;
            }
            else
            {
                difference = new_mp - parseInt(old_mp);
                dmg = false;
                $(".mp_loosing_background").css("background-color", "lightgreen");
                $(".mp_loosing_background").css("width", (new_mp/player.max_mp) * object.parent().width() - 1);
            }

            if(difference > 0)
            {
                let smoother = difference/20;

                let i = 0;

                let x = setInterval(function()
                {
                    if(dmg)
                    {
                        object.css("width", ((parseInt(old_mp)-i)/player.max_mp) * object.parent().width() - 1);
                        if(Math.floor((parseInt(old_mp)-i)) > 0)
                        {
                            $("#player_mp_string").html(Math.floor((parseInt(old_mp)-i)) + "/" + player.max_mp);
                        }
                        else $("#player_mp_string").html(0 + "/" + player.max_mp);
                    }
                    else
                    {
                        object.css("width", ((parseInt(old_mp)+i)/player.max_mp) * object.parent().width() - 1);
                        if(Math.ceil((parseInt(old_mp)+i)) <= player.max_mp)
                        {
                            $("#player_mp_string").html(Math.ceil((parseInt(old_mp)+i)) + "/" + player.max_mp);
                        }
                        else $("#player_mp_string").html(player.max_mp + "/" + player.max_mp);
                    }

                    allignToMiddle("#player_mp_string");
                    i += smoother;
                    //console.log(i);

                    if(i>difference)
                    {
                        clearInterval(x);
                        if(player.mp === 0) object.css("wdith", 0);
                        if(player.mp === player.max_mp) object.css("width", (player.max_mp/player.max_mp) * object.parent().width() - 1);

                        i = 0;
                        let y = setInterval(function()
                        {
                            $(".mp_loosing_background").css("width", ((old_mp-i)/player.max_mp) * $(".mp_loosing_background").parent().width() - 1);
                            i += smoother;

                            if(i>difference)
                            {
                                clearInterval(y);
                                $(".mp_loosing_background").remove();
                            }
                        }, animation_speed/2);
                    }
                }, animation_speed);
            }
        }
    }

    function updateEnemyMpBar(object, enemy, first_time)
    {
        let full_old_mp = $("#enemy_mp_string").text();
        let old_mp = "";
        for(let i=0; i<full_old_mp.length; i++)
        {
            if(full_old_mp[i] == "/") break;
            else old_mp += full_old_mp[i];
        }

        if(old_mp == "") old_mp = 0;

        let new_mp = enemy.mp;

        if(first_time)
        {
            object.css("width", (enemy.mp/enemy.max_mp) * object.parent().width() - 1);
            $("#enemy_mp_string").html(enemy.mp + "/" + enemy.max_mp);
            allignToMiddle("#enemy_mp_string");
        }
        else
        {
            object.parent().append('<div class="mp_loosing_background"></div>');
            $(".mp_loosing_background").css("width", (parseInt(old_mp)/enemy.max_mp) * object.parent().width() - 1);

            let animation_speed = 30;
            let difference = 0;
            let dmg;
            if(parseInt(old_mp) - new_mp > 0)
            {
                difference = parseInt(old_mp) - new_mp;
                dmg = true;
            }
            else
            {
                difference = new_mp - parseInt(old_mp);
                dmg = false;
                $(".mp_loosing_background").css("background-color", "lightgreen");
                $(".mp_loosing_background").css("width", (new_mp/enemy.max_mp) * object.parent().width() - 1);
            }


            //alert(((parseInt(new_hp))/enemy.max_hp) * object.parent().width() - 1);
            if(difference > 0)
            {
                let smoother = difference/20;

                //alert(animation_speed/(difference*smoother)*2);

                let i = 0;

                let x = setInterval(function()
                {
                    if(dmg)
                    {
                        object.css("width", ((parseInt(old_mp)-i)/enemy.max_mp) * object.parent().width() - 1);
                        if(Math.floor((parseInt(old_mp)-i)) > 0)
                        {
                            $("#enemy_mp_string").html(Math.floor((parseInt(old_mp)-i)) + "/" + enemy.max_mp);
                        }
                        else $("#enemy_mp_string").html(0 + "/" + enemy.max_mp);
                    }
                    else
                    {
                        object.css("width", ((parseInt(old_mp)+i)/enemy.max_mp) * object.parent().width() - 1);
                        if(Math.ceil((parseInt(old_mp)+i)) <= enemy.max_mp)
                        {
                            $("#enemy_mp_string").html(Math.ceil((parseInt(old_mp)+i)) + "/" + enemy.max_mp);
                        }
                        else $("#enemy_mp_string").html(enemy.max_mp + "/" + enemy.max_mp);
                    }

                    allignToMiddle("#enemy_mp_string");
                    i += smoother;
                    //console.log(i);

                    if(i>difference)
                    {
                        clearInterval(x);
                        if(enemy.mp === 0) object.css("width", 0);
                        if(enemy.mp === enemy.max_mp) object.css("width", (enemy.max_mp/enemy.max_mp) * object.parent().width() - 1);

                        i = 0;
                        let y = setInterval(function()
                        {
                            $(".mp_loosing_background").css("width", ((old_mp-i)/enemy.max_mp) * $(".mp_loosing_background").parent().width() - 1);
                            i += smoother;

                            if(i>difference)
                            {
                                clearInterval(y);
                                $(".mp_loosing_background").remove();
                            }
                        }, animation_speed/2);
                    }
                }, animation_speed);
            }
        }
    }


}