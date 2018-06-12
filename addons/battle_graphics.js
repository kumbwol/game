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
    this.stopper = stopper;

    let field_size = 50;
    this.field_size = field_size;

    function stopper(skill, player, enemy, battle_table, engine, i)
    {
        let done = $.Deferred();

        if(engine.enemy_skill_plays[i])
        {
            drawActiveEnemySkill(engine.enemy_skill_plays.length, i);

            engine.enemyTakesTurn(skill, player, enemy, battle_table, i);

            if(engine.table_modified)
            {
                this.modifyTable(engine).done(function()
                {
                    //engine.refreshTable();
                    //engine.calculateNewTable();
                    //reNameIds(engine);
                    //reFillTable(engine);
                    engine.refreshTable();
                    engine.resetTempTable();

                    done.resolve();
                    /*engine.logTable();
                    engine.logTempTable();*/
                });
            }
            else
            {
                done.resolve();
            }
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

        var x = setInterval(function()
        {
            for(let i=0; i<enemy_skill_plays.length; i++)
            {
                $("#enemy_skill_chance_" + (i+1)).html(generateRandomNumber(100) + 1);
            }
        }, 5);

        setTimeout(function()
        {
            clearInterval(x);
            for(let i=0; i<enemy_skill_plays.length; i++)
            {
                $("#enemy_skill_chance_" + (i+1)).empty();
                $("#enemy_skill_chance_" + (i+1)).removeClass();
                $("#enemy_skill_chance_" + (i+1)).addClass("enemy_chance_happen");
                if(enemy_skill_plays[i])
                {
                    $("#enemy_skill_chance_" + (i+1)).addClass("success");
                }
                else $("#enemy_skill_chance_" + (i+1)).addClass("failure");
            }
            done.resolve();
        }, 600);


        return done;
    }

    function generateRandomNumber(max_number)
    {
        return Math.floor(Math.random() * max_number);
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

    function myfade(object, cb)
    {
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
            object.attr("class", "attack animated fadeIn").one("webkitanimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function()
            {
                object.removeClass();
                object.attr("class", "attack");
                cb();
            });
        });
    }

    function modifyTable(engine)
    {
        let done = $.Deferred();

        let wait_animation = false;

        for(let i=0; i<engine.battle_table.height; i++)
        {
            for(let j=0; j<engine.battle_table.width; j++)
            {
                if(engine.table[i][j].type != engine.temp_table[i][j].type && engine.table[i][j].type != NUL)
                {
                    wait_animation = true;

                    myfade($("#y_" + i + "_x_" + j), function()
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
                if(engine.table[i][j].type == NUL)
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

    function startFillTable(engine)
    {
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
        let esesek = [];

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
                if(engine.table[j][i].type == NUL)
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
                    bounceDown($("#y_" + j + "_x_" + i), esesek[j], 400);
                }
            }
        }

        /*for(let i=0; i<engine.battle_table.height; i++)
        {
            alert(esesek[i]);
        }*/
    }

    function bounceDown(object, height, time)
    {
        //alert(height);
        //alert($("#battle_table div").css("height"));

        let eses = (height*(field_size+1))+8;

        let magassag = "+=" + eses;

        object.animate({"top": magassag}, (time)).animate({"top": "-=20"}, (time/3)).animate({"top": "+=16"}, (time/3)).animate({"top": "-=6"}, (time/6)).animate({"top": "+=2"}, (time/6));
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


        $("#player_profile").append('<div class="mp" id="player_mp"></div>');

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



        $("#enemy_profile").append('<div class="mp" id="enemy_mp"></div>');
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
        createEnemySkillName(enemy);
        drawEnemySkillChances(enemy_skill_chances)
    }

    function createEnemySkillName(enemy)
    {
        for(let i=0; i<enemy.getSkills().length; i++)
        {
            $("#enemy_skill_"+(i+1)).append('<div class="skill_name_string"></div>');
            let class_selector = "#enemy_skill_" + (i+1) + " .skill_name_string";
            $(class_selector).html(enemy.getSkills()[i].name);
        }
    }

    function drawEnemySkillChances(enemy_skill_chances)
    {

        for(let i=0; i<enemy_skill_chances.length; i++)
        {
            $("#enemy_skill_chance_" + (i+1)).html(enemy_skill_chances[i] + "%");
        }
    }

    function createPlayerSkills(player)
    {
        createSkillName(player);
        createSkillPattern(player);
    }

    function createSkillName(player)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {
            $("#skill_"+(i+1)).append('<div class="skill_name_string"></div>');
            let class_selector = "#skill_" + (i+1) + " .skill_name_string";
            $(class_selector).html(player.getSkills()[i].name);
        }
    }

    function createSkillPattern(player)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {
            $("#skill_"+(i+1)).append('<table class="skill_pattern_table"></table>');
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
        x += 69;
        object.css("left", x);
    }

    function swapFields(engine)
    {
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

        $("#" + field_id.first).animate({"top": field_pos.second.top, "left": field_pos.second.left}, swap_animation_speed, function()
        {
            engine.selected_fields.y0 = -1;
            engine.selected_fields.x0 = -1;
            engine.selected_fields.y1 = -1;
            engine.selected_fields.x1 = -1;
            $("#" + field_id.first).css("z-index", 0);
            engine.allow_select = true;
        });
        $("#" + field_id.second).animate({"top": field_pos.first.top, "left": field_pos.first.left}, swap_animation_speed, function()
        {
            engine.selected_fields.y0 = -1;
            engine.selected_fields.x0 = -1;
            engine.selected_fields.y1 = -1;
            engine.selected_fields.x1 = -1;
            $("#" + field_id.second).css("z-index", 0);
            engine.allow_select = true;
        });

        $("#" + field_id.first).attr("id", "temp1");
        $("#" + field_id.second).attr("id", "temp2");
        $("#temp1").attr("id", field_id.second);
        $("#temp2").attr("id", field_id.first);
    }

    function allignToMiddle(object)
    {
        let object_width = $(object).outerWidth();
        let parent_object_width = $(object).parent().outerWidth();

        $(object).css("left", (parent_object_width-object_width)/2);
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
        if(id!="")
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
        }
        return $object;
    }

    function getType(y, x, engine)
    {
        return engine.table[y][x].type;
    }

    function updateHpBar(object, player)
    {
        object.css("width", (player.hp/player.max_hp) * object.parent().width() - 1);
    }

    function updateEnemyHpBar(object, enemy)
    {
        object.css("width", (enemy.hp/enemy.max_hp) * object.parent().width() - 1);
    }
}