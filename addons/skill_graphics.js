function SkillGraphics()
{
    this.drawSkills = drawSkills;
    this.createEffect = createEffect;

    function drawSkills(player, rank, inBattle)
    {
        /*$("#player_profile").append('<div class="active_skill" id="skill_1"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_2"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_3"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_4"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_5"></div>');
        $("#player_profile").append('<div class="active_skill" id="skill_6"></div>');*/
        if(inBattle)
        {
            $("#player_profile").append('<div class="active_skill" id="skill_1"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_2"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_3"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_4"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_5"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_6"></div>');

            for(let i=1; i<=6; i++)
            {
                $("#skill_" + i).addClass("battle_skill_position_" + i);
            }
        }
        else
        {
            $("#player_profile").append('<div class="active_skill" id="skill_1"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_2"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_3"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_4"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_5"></div>');
            $("#player_profile").append('<div class="active_skill" id="skill_6"></div>');

            for(let i=1; i<=6; i++)
            {
                $("#skill_" + i).addClass("inventory_skill_position_" + i);
            }
        }

        createPlayerSkills(player, rank);
    }

    function allignToMiddle(object)
    {
        let object_width = $(object).outerWidth();
        let parent_object_width = $(object).parent().outerWidth();

        $(object).css("left", (parent_object_width-object_width)/2);
    }

    function createPlayerSkills(player, rank)
    {
        createSkillPattern(player, rank);
        createSkillName(player, rank);
        createSkillEffects(player, rank);
    }

    function createSkillPattern(player, rank)
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
            //alert(player.getSkills()[i][rank[i]].getSkillPatternRotation());
            for(let j=0; j<player.getSkills()[i][rank[i]].getSkillPatternHeight(); j++)
            {
                $(table_selector).append(createRow("skill_pattern_row" + j));
                let row_selector = table_selector + " .skill_pattern_row" + j;
                for(let k=0; k<player.getSkills()[i][rank[i]].getSkillPatternWidth(); k++)
                {
                    $(row_selector).append(createColumn("skill_pattern_column" + k +j));
                    //alert(player.getSkills()[i].getSkillPatternValue(k,j));
                    switch(player.getSkills()[i][rank[i]].getSkillPatternValue(k,j))
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

                        case PAT:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-image", "repeating-linear-gradient(45deg, crimson, crimson 3px, #ffffff 3px, #ffffff 6px)");
                            break;
                        }

                        case MAN:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "aqua");
                            break;
                        }

                        case PMA:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-image", "repeating-linear-gradient(45deg, aqua, aqua 3px, #ffffff 3px, #ffffff 6px)");
                            break;
                        }

                        case DEF:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "bisque");
                            break;
                        }

                        case PDE:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-image", "repeating-linear-gradient(45deg, bisque, bisque 3px, #ffffff 3px, #ffffff 6px)");
                            break;
                        }

                        case MOV:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-color", "forestgreen");
                            break;
                        }

                        case PMO:
                        {
                            $(row_selector + " ."+"skill_pattern_column" + k + j).css("background-image", "repeating-linear-gradient(45deg, forestgreen, forestgreen 3px, #ffffff 3px, #ffffff 6px)");
                            break;
                        }
                    }
                }
            }
            allignSkillPatternTable($(table_selector));
        }
    }

    function createSkillName(player, rank)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {
            $("#skill_" + (i+1) + " .skill_left_part_top").append('<div class="skill_name_string"></div>');
            let class_selector = "#skill_" + (i+1) + " .skill_name_string";
            $(class_selector).html(player.getSkills()[i][rank[i]].name);
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

    function createSkillEffects(player, rank)
    {
        drawPlayerSkillEffects(player, true, rank);
        drawPlayerSkillEffects(player, false, rank);
    }

    function allignToVerticalMiddle(object)
    {
        let object_height = $(object).outerHeight();
        let parent_object_height = $(object).parent().outerHeight();

        $(object).css("top", (parent_object_height-object_height)/2-1);
    }

    function drawPlayerSkillEffects(player, primary, rank)
    {
        let selector = "";
        let effect_type = 0;
        let effect_number = 0;
        let prim_or_second = -1;

        for(let i=0; i<player.getSkills().length; i++)
        {

            if(primary)
            {
                selector = " .skill_left_part_bottom_left";
                effect_type = player.getSkills()[i][rank[i]].getSkillEffect(PRIMARY).type;
                prim_or_second = PRIMARY;
            }
            else
            {
                selector = " .skill_left_part_bottom_right";
                effect_type = player.getSkills()[i][rank[i]].getSkillEffect(SECONDARY).type;
                prim_or_second = SECONDARY;
            }

            switch(effect_type)
            {
                case DMG:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).dmg;
                    break;
                }

                case HEAL:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).heal;
                    break;
                }

                case POISON:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).poison_amount;
                    break;
                }

                case POISON_DMG:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).poison_dmg;
                    break;
                }

                case MANA_REGEN:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).mana_regen;
                    break;
                }

                case MANA_DRAIN:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).mana_drain;
                    break;
                }

                case COMBO:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).combo_amount;
                    break;
                }

                case ARMOR:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).armor;
                    break;
                }

                case PENETRATE:
                {
                    effect_number = player.getSkills()[i][rank[i]].getSkillEffect(prim_or_second).penetrate;
                    break;
                }

                default:
                {
                    effect_number = 0;
                    break;
                }
            }

            createEffect(effect_type, effect_number, "#skill_" + (i+1) + selector + "_image", "#skill_" + (i+1) + selector + "_number");
        }
    }

    function createEffect(effect_type, effect_number, parent_object_image, parent_object_number)
    {
        if(effect_number > 0)
        {
            $(parent_object_number).append('<div class="effect_number"></div>');
            $(parent_object_number + " .effect_number").text(effect_number);
            allignTextRight($(parent_object_number + " .effect_number"));
            allignToMiddleY($(parent_object_number + " .effect_number"));
        }

        switch(effect_type)
        {
            case DMG:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/dmg.png")');
                break;
            }

            case HEAL:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/heal.png")');
                break;
            }

            case SHADOWFORM:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/shadowform.png")');
                break;
            }

            case POISON:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/poison.png")');
                break;
            }

            case POISON_DMG:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/poison_dmg.png")');
                break;
            }

            case MANA_REGEN:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/regen.png")');
                break;
            }

            case MANA_DRAIN:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/loss.png")');
                break;
            }

            case PROMOTE:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/promote.png")');
                break;
            }

            case STUN:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/stun.png")');
                break;
            }

            case PARALYZE:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/paralyze.png")');
                break;
            }

            case FREEZE:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/freeze.png")');
                break;
            }

            case COMBO:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/combo.png")');
                break;
            }

            case ARMOR:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/armor.png")');
                break;
            }

            case PENETRATE:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/penetrate.png")');
                break;
            }
        }
    }

    function allignTextRight(object)
    {
        let object_width = $(object).outerWidth();
        let parent_object_width = $(object).parent().outerWidth();

        $(object).css("left", (parent_object_width-object_width) - 2);
    }

    function allignToMiddleY(object)
    {
        let object_height = $(object).outerHeight();
        let parent_object_height = $(object).parent().outerHeight();

        $(object).css("top", (parent_object_height-object_height)/2);
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
}