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
            effect: 0,
            moving: false
        };

        let player_selected_skill_id = 0;

        let player_turn = true;

        let engine = new BattleEngine(battle_table);
        let player = new Player("Kumbi");
        let enemy  = new Enemy("Skeleton");
        let graphics = new BattleGraphics(battle_table, engine, player);
        let skill_activation_finished = true;

        $("#create_table").on("click", function()
        {
            engine.calculateEnemySkillChances(skill, enemy);
            graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances);
            graphics.drawTable(battle_table);
            graphics.drawAbilityPoints(player);

            engine.calculateNewTable();
            graphics.reNameIds(engine);
            graphics.startFillTable(engine);
            //graphics.reFillTable(engine);
            engine.refreshTable();

        });

        $("#game_background").on("click", ".attack, .mana, .defense, .move", function()
        {
            if(player.ap > 0 && player_turn)
            {
                if(engine.allow_select && !skill.moving)
                {
                    let y = ($(this).attr("id"))[2];
                    let x = ($(this).attr("id"))[6];
                    if(!engine.selectField(y, x))
                    {
                        if(engine.table[y][x].selected) graphics.drawSelector($(this).attr("id"));
                        else graphics.deleteSelector($(this).attr("id"));
                    }
                    else
                    {
                        graphics.deleteSelector(engine.selected_field_id);
                        graphics.swapFields(engine);
                        player.ap--;
                        if(player.ap > 0) graphics.refreshAbilityPoint(player);
                        else graphics.drawEndTurn();
                    }
                }
            }
            else if(!skill.moving)
            {
                graphics.shakeEndTurn();
            }

            if(skill.moving && player_turn)
            {
                if(skill_activation_finished && engine.canActivateSkill(skill, parseInt($(this).attr("id")[6]), parseInt($(this).attr("id")[2])))
                {
                    skill_activation_finished = false;
                    for(let i=0; i<skill.table_height; i++)
                    {
                        for(let j=0; j<skill.table_width; j++)
                        {
                            if(skill.table[i][j] != NUL)
                            {
                                $("#y_" + (parseInt($(this).attr("id")[2])+i).toString() + "_x_" + (parseInt($(this).attr("id")[6])+j)).remove();
                                engine.deleteField(parseInt($(this).attr("id")[6])+j, parseInt($(this).attr("id")[2])+i);
                            }
                        }
                    }

                    engine.resetTempTable();
                    graphics.deleteSelector(engine.selected_field_id);
                    engine.activateSkill(skill.effect, player, enemy, player_turn);

                    /*graphics.animateDamageNumbers(skill.effect).done(function()
                    {
                        graphics.modifyTable(engine).done(function()
                        {
                            engine.refreshTable();
                            engine.calculateNewTable();
                            engine.calculateEnemySkillChances(skill, enemy);
                            //graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances);
                            graphics.updateEnemyHpBar($("#enemy_hp"), enemy);
                            graphics.updateEnemySkillChances(engine.enemy_skill_chances);
                            graphics.reNameIds(engine);
                            graphics.reFillTable(engine);
                            engine.refreshTable();
                            engine.table_modified = false;
                            skill_activation_finished = true;
                        });
                    });*/

                    graphics.animateDamageNumbers(skill.effect, player_turn).done(function()
                    {
                        skill_activation_finished = true;
                    });

                    if(skill.effect.dmg > 0)  graphics.updateEnemyHpBar($("#enemy_hp"), enemy);
                    if(skill.effect.heal > 0) graphics.updateHpBar($("#player_hp"), player);

                    graphics.modifyTable(engine).done(function()
                    {
                        engine.refreshTable();
                        engine.calculateNewTable();
                        engine.calculateEnemySkillChances(skill, enemy);
                        graphics.updateEnemySkillChances(engine.enemy_skill_chances);
                        graphics.reNameIds(engine);
                        graphics.reFillTable(engine);
                        engine.refreshTable();
                        engine.table_modified = false;
                    });
                }
            }
        });

        $("#game_background").on("click", "#skill_1, #skill_2, #skill_3, #skill_4, #skill_5, #skill_6", function(ev)
        {
            if(skill.moving) $(".selected_skill").remove();
            let skill_id = $(this).attr("id");
            player_selected_skill_id = skill_id[6];

            graphics.drawSelectedSkill(player, parseInt(skill_id[6])-1, skill);
            engine.addSkillValue(player, parseInt(skill_id[6])-1, skill);

            if(ev.pageX<960-skill.width +24 && ev.pageX>graphics.field_size/2) $(".selected_skill").css("left", ev.pageX-graphics.field_size/2);
            else $(".selected_skill").css("left", 0);

            if(ev.pageY<540-skill.height+24 && ev.pageY>graphics.field_size/2) $(".selected_skill").css("top",  ev.pageY-graphics.field_size/2);
            else $(".selected_skill").css("top", 540-skill.height);

            //alert(skill.effect);

            skill.moving = true;
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
            if(skill.moving)
            {
                $(".selected_skill").remove();
                skill.moving = false;
                skill.height = 0;
                skill.width  = 0;
            }
            return false;
        });

        $("#game_background").on("mouseenter", ".move", function()
        {
            if(skill.moving)
            {
                //alert("szia");
            }
        });

        $("#game_background").on("click", "#end_turn", function()
        {
            if(player_turn)
            {
                player_turn = false;
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
                                        engine.calculateEnemySkillChances(skill, enemy);
                                        graphics.drawSkillBars(player, enemy, engine.enemy_skill_chances);



                                        player_turn = true;
                                        player.ap = player.max_ap;
                                        if(skill.moving)
                                        {
                                            engine.addSkillValue(player, parseInt(player_selected_skill_id)-1, skill);
                                        }
                                        graphics.deleteEndTurn();
                                        graphics.drawAbilityPoints(player);
                                    });
                                });
                            });
                        });
                    })

                });
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
            start_game();
        });
    }
});