console.log("battle_graph.js loaded");

function BattleGraphics(battle_table, engine)
{
    this.battle_table = battle_table;
    this.drawTable = drawTable;
    this.drawSelector = drawSelector;
    this.deleteSelector = deleteSelector;
    this.swapFields = swapFields;
    this.drawSkillBar = drawSkillBar;
    this.drawSelectedSkill = drawSelectedSkill;
    this.drawTopBar = drawTopBar;
    this.reFillTable = reFillTable;
    this.reNameIds = reNameIds;

    function reNameIds(engine, column_id)
    {
        let number_of_holes = 0;
        for(let i=engine.battle_table.height-1; i>=0; i--)
        {
            if(engine.table[i][column_id].type == NUL)
            {
                number_of_holes++;
            }
            else if(number_of_holes>0)
            {
                $("#y_" + i + "_x_" + column_id).attr("id", "y_" + (i+number_of_holes) + "_x_" + column_id);
            }
        }

        //alert(number_of_holes);
        let y=0;
        for(let i=number_of_holes-1; i>=0; i--)
        {
            //alert('szia');
            $("#battle_table").append(createField(("y_" + i + "_x_" + column_id), MAN, column_id-1, y, true));
            y--;
        }
    }

    function reFillTable(engine)
    {
        let height = 0;

        let column_moved = [];

        for(let i=0; i<engine.battle_table.width; i++)
        {
            column_moved[i] = false;
        }

        id=7;

        for(let i=0; i<engine.battle_table.height; i++)
        {
            for(let j=0; j<engine.battle_table.width; j++)
            {
                if(engine.table[i][j].type == NUL && !column_moved[j])
                {
                    for(let k=battle_table.height-1; k>=0; k--)
                    {
                        //alert(height);
                        if(engine.table[k][j].type == NUL)
                        {
                            height++;
                        }
                        else if(height>0)
                        {
                            bounceDown($("#y_" + id + "_x_" + j), height, 400);
                            id--;
                        }

                        //alert(engine.table[k][j].type);
                    }
                    column_moved[j] = true;
                    height = 0;
                }
            }
        }
    }

    function bounceDown(object, height, time)
    {
        //alert(height);
        let eses = (height*47)+8;

        let magassag = "+=" + eses;

        object.animate(
            {
                top: magassag
            }, (time)
        );

        object.animate(
            {
                top: "-=20"
            }, (time/3)
        );

        object.animate(
            {
                top: "+=16"
            }, (time/3)
        );

        object.animate(
            {
                top: "-=6"
            }, (time/6)
        );

        object.animate(
            {
                top: "+=2"
            }, (time/6)
        );
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
        skill.height = player.getSkills()[skill_id].getSkillPatternHeight()*47 + 1;
        skill.width  = player.getSkills()[skill_id].getSkillPatternWidth()*47  + 1;
    }

    function drawSkillBar(player)
    {
        $("#game_background").append('<div id="player_profile"></div>');
        $("#player_profile").append('<div id="hp"></div>');
        $("#player_profile").append('<div id="mp"></div>');
        $("#player_profile").append('<div id="name"></div>');
        $("#name").append('<div id="name_string"></div>');
        $("#name_string").html(player.name);
        allignToMiddle("#name_string");
        $("#player_profile").append('<div id="self"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_1"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_2"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_3"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_4"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_5"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_6"></div>');

        createSkills(player);
    }


    function createSkills(player)
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
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "red");
                            break;
                        }

                        case MAN:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "blue");
                            break;
                        }

                        case MOV:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "green");
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
        $("#battle_table").css("width",  (this.battle_table.width*48)  - this.battle_table.width + 1);
        $("#battle_table").css("height", (this.battle_table.height*48) - this.battle_table.height + 1);

        allignToMiddle($("#battle_table"));

        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                let row_id = "y_" + i;
                let column_id = row_id + "_x_" + j;
                $("#battle_table").append(createField(column_id, getType(i, j, engine), j, i, true));
            }
        }
    }

    function drawSelector(id)
    {
        let $object = $("#" + id);
        let current_bg = $object.css("background-image");
        $object.css("background-image", current_bg + "," + 'url("addons/images/selector.gif")');
    }

    function deleteSelector(id)
    {
        let $object = $("#" + id);
        let current_bg = $object.css("background-image");
        let new_bg = "";
        for(let i=0; i<current_bg.length; i++)
        {
            if(current_bg[i] == ",") break;
            else new_bg += current_bg[i];
        }
        $object.css("background-image", new_bg);
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
        $object.css('position', 'absolute');
        $object.css('left', (x*48)-x+1);
        $object.css('top',  (y*48)-y+1);
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
}