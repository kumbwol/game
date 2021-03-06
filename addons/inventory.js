function Inventory(player, skill_graphics)
{
    let bag = {
        height: 7,
        width: 6,
        field_size: 53
    };

    let engine = new InventoryEngine(bag);
    let graphics = new InventoryGraphics(bag);

    /*engine.addItem(new Item(C_LEFT_HAND,  0, ITEM_SWORD));
    engine.addItem(new Item(C_RIGHT_HAND, 1, ITEM_NECKLACE));
    engine.addItem(new Item(C_HEAD,       2, ITEM_NECKLACE));*/

    /*engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 4, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 4, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 4, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 4, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 4, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 4, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 4, ITEM_RANDOM));
    engine.addItem(new Item(RANDOM_ITEM, 4, ITEM_RANDOM));*/

    this.showInventory = showInventory;
    this.addItem = addItem;

    function addItem(item)
    {
        engine.addItem(item);
    }

    function showInventory()
    {
        graphics.drawInventory(engine, player, skill_graphics);

        $("#game_background").append('<div id="player_profile" class="inventory_skill"></div>');
        graphics.drawConnenctingLines(player);
        graphics.drawSkills(player, skill_graphics, false);
        skill_graphics.drawSkillRanks(player, false);
        graphics.createBackButton();

        $("#game_background").on("mousedown", ".item", function()
        {
            $(this).css("z-index", 3);
        });

        $("#game_background").on("mouseup", ".item", function()
        {
            $(this).css("z-index", 1);
        });

        $("#game_background").on("click", "#exit_rank_explainer_in_inventory", function()
        {
            $("#player_profile").remove();
            $("#game_background").append('<div id="player_profile" class="inventory_skill"></div>');
            graphics.drawSkills(player, skill_graphics, false);
            skill_graphics.removeRankHighlight();
        });

        $("#game_background").on("mousedown", ".skill_right_part_bottom, .skill_left_part_bottom_left, .skill_left_part_bottom_right", function(ev)
        {
            if(engine.inInventory())
            {
                //console.log($(this).attr("class"));
                //console.log($(this).parent().parent().attr("id"));
                //console.log($(this).parent().parent().attr("id")[6]);
                let right_click = 3;


                if(ev.which === right_click)
                {
                    let mouse_x = (ev.pageX);
                    let mouse_y = (ev.pageY);


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

        $("#game_background").on("mouseup",function()
        {
            if(engine.inInventory())
            {
                $("#explain_box").remove();
            }
        });


        $("#game_background").on("contextmenu", function()
        {
            return false;
        });

        $("#game_background").on("click", "#skill_rank_inside_0, #skill_rank_inside_1, #skill_rank_inside_2, #skill_rank_inside_3, #skill_rank_inside_4, #skill_rank_inside_5", function()
        {
            skill_graphics.drawRankExplainer(parseInt(($(this).attr("id"))[18]), player.rank[parseInt(($(this).attr("id"))[18])], player);
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

    }

}
