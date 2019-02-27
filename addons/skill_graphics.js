function SkillGraphics(player)
{
    this.drawSkillsSG = drawSkillsSG;
    this.createEffect = createEffect;
    this.updateSkillRanks = updateSkillRanks;
    this.drawSkillRanks = drawSkillRanks;
    this.removeRankHighlight = removeRankHighlight;
    this.drawPlayerEffectExplainer = drawPlayerEffectExplainer;
    this.drawEnemyEffectExplainer = drawEnemyEffectExplainer;
    this.deleteSkillRanks = deleteSkillRanks;
    this.drawRankExplainer = drawRankExplainer;

    function deleteSkillRanks()
    {
        $("#skill_rank_inside_0").remove();
        $("#skill_rank_inside_1").remove();
        $("#skill_rank_inside_2").remove();
        $("#skill_rank_inside_3").remove();
        $("#skill_rank_inside_4").remove();
        $("#skill_rank_inside_5").remove();
        $("#skill_rank_border_0").remove();
        $("#skill_rank_border_1").remove();
        $("#skill_rank_border_2").remove();
        $("#skill_rank_border_3").remove();
        $("#skill_rank_border_4").remove();
        $("#skill_rank_border_5").remove();
    }

    function drawSkillRanks(player, inBattle)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {
            if(player.getSkills()[i].length > 1) createSkillRank(player, i, inBattle);
        }
        this.updateSkillRanks(player);
    }

    function deletePlayerSkills()
    {
        $("#player_profile > .active_skill").remove();
        $("#rank_explainer").remove();
        $("#selected_skill").remove();
    }

    function highlightRank(skill_id)
    {
        $("#skill_rank_border_" + skill_id).addClass("selected_rank");
    }

    function drawRankExplainerBackground(inBattle)
    {
        //alert($("#enemy_name").length);
        $("#player_profile").append('<div id="rank_explainer"></div>');
        if(!inBattle)
        {
            $("#player_profile").css("top", "-105px");
            $("#rank_explainer").css("border-width", "1px 1px 1px 1px");
        }
    }

    function allignRankPatternToMiddle(object, object_width)
    {
        let parent_object_width = $(object).parent().outerWidth();

        $(object).css("left", (parent_object_width-object_width)/2);
    }

    function createField(id, type, x, y, animated, field_size)
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

            case PMA:
            {
                $object.attr('class', "promoted_mana");
                break;
            }

            case ATT:
            {
                $object.attr('class', "attack");
                break;
            }

            case PAT:
            {
                $object.attr('class', "promoted_attack");
                break;
            }

            case DEF:
            {
                $object.attr('class', "defense");
                break;
            }

            case PDE:
            {
                $object.attr('class', "promoted_defense");
                break;
            }

            case MOV:
            {
                $object.attr('class', "move");
                break;
            }

            case PMO:
            {
                $object.attr('class', "promoted_move");
                break;
            }

            case POI:
            {
                $object.attr('class', "poison");
                break;
            }

            case PRO:
            {
                $object.attr('class', "promoted_field");
                break;
            }
        }
        return $object;
    }

    function drawSelectedSkill(player, skill_id, skill, rank, showOriginalPattern)
    {
        let field_size = 50;
        $("#game_background").append('<div id="selected_skill"></div>');
        for(let i=0; i<player.getSkills()[skill_id][rank].getSkillPatternHeight(); i++)
        {
            for(let j=0; j<player.getSkills()[skill_id][rank].getSkillPatternWidth(); j++)
            {
                let row_id = "sy_" + i;
                let column_id = row_id + "_sx_" + j;
                if(showOriginalPattern)
                {
                    $("#selected_skill").append(createField(column_id, player.getSkills()[skill_id][rank].getSkillPatternOriginalValue(j, i), j, i, false, field_size));
                }
                else $("#selected_skill").append(createField(column_id, player.getSkills()[skill_id][rank].getSkillPatternValue(j, i), j, i, false, field_size));
            }
        }
        skill.height = player.getSkills()[skill_id][rank].getSkillPatternHeight()*(field_size+1) + 1; //TODO: Fix how 50 calculated
        skill.width  = player.getSkills()[skill_id][rank].getSkillPatternWidth()*(field_size+1)  + 1;
    }

    function drawRankPattern(player, skill_id, rank)
    {
        let skill =
            {
                height: 0,
                width: 0
            };
        drawSelectedSkill(player, skill_id, skill, rank, true);
        $("#selected_skill").appendTo("#rank_explainer");
        $("#selected_skill").css("opacity", 1);
        $("#selected_skill").css("pointer-events", "");
        $("#selected_skill").css("top", "30px");
        allignRankPatternToMiddle($("#selected_skill"), skill.width+1);
    }

    function removeRankHighlight()
    {
        $(".trapezoid_border").removeClass("selected_rank");
    }

    function createSkillInExplainer()
    {
        $("#rank_explainer").append('<div id="skill_0"></div>');
        $("#skill_0").append('<div class="skill_left_part_top"></div>');
        $("#skill_0").append('<div class="skill_left_part_bottom"></div>');

        $("#skill_0 .skill_left_part_bottom").append('<div class="skill_left_part_bottom_left"></div>');
        $("#skill_0 .skill_left_part_bottom_left").append('<div class="skill_left_part_bottom_left_image"></div>');
        $("#skill_0 .skill_left_part_bottom_left").append('<div class="skill_left_part_bottom_left_number"></div>');

        $("#skill_0 .skill_left_part_bottom").append('<div class="skill_left_part_bottom_right"></div>');
        $("#skill_0 .skill_left_part_bottom_right").append('<div class="skill_left_part_bottom_right_image"></div>');
        $("#skill_0 .skill_left_part_bottom_right").append('<div class="skill_left_part_bottom_right_number"></div>');

        $("#skill_0 .skill_left_part_top").append('<div class="skill_name_string"></div>');
    }

    function createArrows(skill_id, rank_id, max_rank)
    {
        if(rank_id > 0) $("#rank_explainer").append('<div id="left_arrow"></div>');
        if(rank_id+1 < max_rank) $("#rank_explainer").append('<div id="right_arrow"></div>');
    }

    function createResetButtonInRankExplainer(inBattle, rank)
    {
        if(inBattle && rank > 0)
        {
            $("#rank_explainer").append('<div id="reset_rank"></div>');
            $("#reset_rank").append('<div id="reset_button_inside">!</div>');
        }
    }

    function createExitButtonInRankExplainer(inBattle)
    {
        if(inBattle)
        {
            $("#rank_explainer").append('<div id="exit_rank_explainer"></div>');
            $("#exit_rank_explainer").append('<div id="exit_button_inside">X</div>');
        }
        else
        {
            $("#rank_explainer").append('<div id="exit_rank_explainer_in_inventory"></div>');
            $("#exit_rank_explainer_in_inventory").append('<div id="exit_button_inside">X</div>');
        }

        //alert($("#exit_button_inside").outerWidth());
        //allignToMiddle("#exit_button_inside");
    }

    function createRank(rank)
    {
        $("#rank_explainer").append('<div id="rank_in_explain" class="roman_number_in_explain"></div>');
        switch(rank)
        {
            case 1:
            {
                $("#rank_in_explain").html("I");
                break;
            }

            case 2:
            {
                $("#rank_in_explain").html("II");
                break;
            }

            case 3:
            {
                $("#rank_in_explain").html("III");
                break;
            }

            case 4:
            {
                $("#rank_in_explain").html("IV");
                break;
            }

            case 5:
            {
                $("#rank_in_explain").html("V");
                break;
            }

            case 6:
            {
                $("#rank_in_explain").html("VI");
                break;
            }

            case 7:
            {
                $("#rank_in_explain").html("VII");
                break;
            }
        }

        allignToMiddle("#rank_in_explain");
    }

    function drawRankExplainer(skill_id, rank_id, player)
    {
        //alert("hi");
        //alert(skill_id);
        //alert(rank);
        player.observed_rank_id = rank_id;
        player.observed_skill_id = skill_id;
        let inBattle = $("#enemy_name").length;
        deletePlayerSkills();
        removeRankHighlight();
        highlightRank(skill_id);
        drawRankExplainerBackground(inBattle);
        drawRankPattern(player, skill_id, rank_id);
        createSkillInExplainer();

        let skill_name = player.getSkills()[skill_id][rank_id].name;
        let class_selector = "#skill_0 .skill_name_string";
        $(class_selector).html(skill_name);


        let effect_type = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).type;
        let effect_number = 0;

        switch(effect_type)
        {
            case DMG:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).dmg;
                break;
            }

            case HEAL:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).heal;
                break;
            }

            case POISON:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).poison_amount;
                break;
            }

            case POISON_DMG:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).poison_dmg;
                break;
            }

            case MANA_REGEN:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).mana_regen;
                break;
            }

            case MANA_DRAIN:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).mana_drain;
                break;
            }

            case MANA_COST:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).mana_cost;
                break;
            }

            case PARALYZE:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).paralyze_amount;
                break;
            }

            case PENETRATE:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(PRIMARY).penetrate;
            }
        }

        createEffect(effect_type, effect_number, "#skill_0 .skill_left_part_bottom_left_image", "#skill_0 .skill_left_part_bottom_left_number");
        effect_type = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).type;

        effect_number = 0;

        switch(effect_type)
        {
            case DMG:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).dmg;
                break;
            }

            case HEAL:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).heal;
                break;
            }

            case POISON:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).poison_amount;
                break;
            }

            case POISON_DMG:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).poison_dmg;
                break;
            }

            case MANA_REGEN:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).mana_regen;
                break;
            }

            case MANA_DRAIN:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).mana_drain;
                break;
            }

            case MANA_COST:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).mana_cost;
                break;
            }

            case PARALYZE:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).paralyze_amount;
                break;
            }

            case PENETRATE:
            {
                effect_number = player.getSkills()[skill_id][rank_id].getSkillEffect(SECONDARY).penetrate;
            }
        }
        createEffect(effect_type, effect_number, "#skill_0 .skill_left_part_bottom_right_image", "#skill_0 .skill_left_part_bottom_right_number");
        createArrows(skill_id, rank_id, player.getSkills()[skill_id].length);
        createRank((rank_id+1));
        createExitButtonInRankExplainer(inBattle);
        createResetButtonInRankExplainer(inBattle, player.rank[skill_id]);
    }

    function createSkillRank(player, id, inBattle)
    {
        let $object_border = $('<div></div>');
        $object_border.attr("id", "skill_rank_border_" + id);
        $object_border.addClass("trapezoid_border");

        let $object_inside = $('<div></div>');
        $object_inside.attr("id", "skill_rank_inside_" + id);
        $object_inside.addClass("trapezoid_inside");
        $object_inside.css("z-index", 2);

        $object_border.append($object_inside);

        $("#game_background").append($object_border);
        if(inBattle)
        {
            $object_border.css("top", "183px");
            $object_border.css("left", "199px");
            $object_border.css("top", "+=" + (id*($object_border.outerHeight())) + "px");
        }
        else
        {
            $object_border.css("top", "77px");
            $object_border.css("left", "218px");
            $object_border.css("top", "+=" + (id*($object_border.outerHeight())) + "px");
        }


        //alert($object_number.css("width"));
    }

    function updateSkillRanks(player)
    {
        let object_number;
        let object_inside = ("#skill_rank_inside_");
        for(let i=0; i<player.getSkills().length; i++)
        {
            if(player.getSkills()[i].length > 1)
            {
                $("#roman_number_" + i).remove();

                let $object_number = $('<div></div>');
                $object_number.attr("id", "roman_number_" + i);
                $object_number.addClass("roman_number");
                $(object_inside + i).append($object_number);

                object_number = ("#roman_number_" + i);
                switch(player.rank[i])
                {
                    case 0:
                    {
                        $(object_number).html("I");
                        $(object_inside + i).removeClass("color_rank_2");
                        $(object_inside + i).removeClass("color_rank_3");
                        $(object_inside + i).removeClass("color_rank_4");
                        $(object_inside + i).removeClass("color_rank_5");
                        $(object_inside + i).removeClass("color_rank_6");
                        $(object_inside + i).removeClass("color_rank_7");
                        $(object_inside + i).addClass("color_rank_1");
                        break;
                    }

                    case 1:
                    {
                        $(object_number).html("II");
                        $(object_inside + i).removeClass("color_rank_1");
                        $(object_inside + i).addClass("color_rank_2");
                        break;
                    }

                    case 2:
                    {
                        $(object_number).html("III");
                        $(object_inside + i).removeClass("color_rank_2");
                        $(object_inside + i).addClass("color_rank_3");
                        break;
                    }

                    case 3:
                    {
                        $(object_number).html("IV");
                        $(object_inside + i).removeClass("color_rank_3");
                        $(object_inside + i).addClass("color_rank_4");
                        break;
                    }

                    case 4:
                    {
                        $(object_number).html("V");
                        $(object_inside + i).removeClass("color_rank_4");
                        $(object_inside + i).addClass("color_rank_5");
                        break;
                    }

                    case 5:
                    {
                        $(object_number).html("VI");
                        $(object_inside + i).removeClass("color_rank_5");
                        $(object_inside + i).addClass("color_rank_6");
                        break;
                    }

                    case 6:
                    {
                        $(object_number).html("VII");
                        $(object_inside + i).removeClass("color_rank_6");
                        $(object_inside + i).addClass("color_rank_7");
                        break;
                    }
                }

                let inside_width = $(object_inside + i).outerWidth();
                let number_width = $(object_number).outerWidth();

                $(object_number).css("left", "-=30px"); //go left
                $(object_number).css("left", "+=" + (inside_width-number_width)/2);
                $(object_number).css("top", "+=7px");
            }
        }
    }

    function drawSkillsSG(player, inBattle)
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

        createPlayerSkills(player);
    }

    function allignToMiddle(object)
    {
        let object_width = $(object).outerWidth();
        let parent_object_width = $(object).parent().outerWidth();

        $(object).css("left", (parent_object_width-object_width)/2);
    }

    function createPlayerSkills(player)
    {
        createSkillPattern(player);
        createSkillName(player);
        createSkillEffects(player);
    }

    function createSkillPattern(player)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {
            //console.log(player.getSkills()[i][0].name);
            if(player.getSkills()[i][0].name!=="EMPTY")
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
                for(let j=0; j<player.getSkills()[i][player.rank[i]].getSkillPatternHeight(); j++)
                {
                    $(table_selector).append(createRow("skill_pattern_row" + j));
                    let row_selector = table_selector + " .skill_pattern_row" + j;
                    for(let k=0; k<player.getSkills()[i][player.rank[i]].getSkillPatternWidth(); k++)
                    {
                        $(row_selector).append(createColumn("skill_pattern_column" + k +j));
                        //alert(player.getSkills()[i].getSkillPatternValue(k,j));
                        switch(player.getSkills()[i][player.rank[i]].getSkillPatternValue(k,j))
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
    }

    function createSkillName(player)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {
            $("#skill_" + (i+1) + " .skill_left_part_top").append('<div class="skill_name_string"></div>');
            let class_selector = "#skill_" + (i+1) + " .skill_name_string";
            $(class_selector).html(player.getSkills()[i][player.rank[i]].name);
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

    function createSkillEffects(player)
    {
        drawPlayerSkillEffects(player, true);
        drawPlayerSkillEffects(player, false);
    }

    function allignToVerticalMiddle(object)
    {
        let object_height = $(object).outerHeight();
        let parent_object_height = $(object).parent().outerHeight();

        $(object).css("top", (parent_object_height-object_height)/2-1);
    }

    function drawPlayerSkillEffects(player, primary)
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
                effect_type = player.getSkills()[i][player.rank[i]].getSkillEffect(PRIMARY).type;
                prim_or_second = PRIMARY;
            }
            else
            {
                selector = " .skill_left_part_bottom_right";
                effect_type = player.getSkills()[i][player.rank[i]].getSkillEffect(SECONDARY).type;
                prim_or_second = SECONDARY;
            }

            switch(effect_type)
            {
                case DMG:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).dmg;
                    break;
                }

                case HEAL:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).heal;
                    break;
                }

                case POISON:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).poison_amount;
                    break;
                }

                case POISON_DMG:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).poison_dmg;
                    break;
                }

                case MANA_REGEN:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).mana_regen;
                    break;
                }

                case MANA_DRAIN:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).mana_drain;
                    break;
                }

                case MANA_COST:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).mana_cost;
                    break;
                }

                case COMBO:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).combo_amount;
                    break;
                }

                case ARMOR:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).armor;
                    break;
                }

                case PENETRATE:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).penetrate;
                    break;
                }

                case PARALYZE:
                {
                    effect_number = player.getSkills()[i][player.rank[i]].getSkillEffect(prim_or_second).paralyze_amount;
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
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/mana_drain.png")');
                break;
            }

            case MANA_COST:
            {
                $(parent_object_image).css("background-image", 'url("addons/images/skill_effects/mana_cost.png")');
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

    function drawPlayerEffectExplainer(unit, effect_type)
    {
        let x = $('<div id="explain_box">');

        x.append('<div class="explain_box_title">' + paragraphs.effect.titles[effect_type] + '</div>');
        x.append('<div class="explain_box_line"></div>');
        x.append('<div class="explain_box_paragraph">' + paragraphMacroChanger(paragraphs.effect.paragraphs[effect_type]) + '</div>');

        return x;
    }

    function paragraphMacroChanger(text)
    {
        text = text.replace("MOVE", '<span style="color:forestgreen; font-weight:bold">MOVE</span>');
        text = text.replace("DEFENSE", '<span style="color:bisque; font-weight:bold">DEFENSE</span>');
        text = text.replace("ATTACK", '<span style="color:crimson; font-weight:bold">ATTACK</span>');
        text = text.replace("MAGIC", '<span style="color:aqua; font-weight:bold">MAGIC</span>');

        return text;
    }

    function drawEnemyEffectExplainer(unit, primary, id)
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
}
