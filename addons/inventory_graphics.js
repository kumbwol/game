function InventoryGraphics(bag)
{
    this.drawInventory = drawInventory;
    this.drawSkills = drawSkills;
    this.createBackButton = createBackButton;
    this.changeSkillsButton = changeSkillsButton;
    this.updateSkills = updateSkills;

    const BAG_TO_CHARACTER       = 0;
    const CHARACTER_TO_CHARACTER = 1;
    const BAG_TO_BAG             = 2;
    const CHARACTER_TO_BAG       = 3;

    function updateSkills(player, skill_graphics)
    {
        $("#player_profile").remove();
        $(".trapezoid_border").remove();

        $("#game_background").append('<div id="player_profile" class="inventory_skill"></div>');
        drawSkills(player, skill_graphics, false);
        skill_graphics.drawSkillRanks(player, false);
    }

    function drawLine(id)
    {
        let $object = $('<div></div>');
        $object.attr("id", "line_" + id);
        $object.attr("class", "line");
        $object.css("top", (id*59)+107 + "px");

        return $object;
    }

    function changeSkillsButton()
    {
        $("#game_background").append('<button id="change_skills">Change</button>');
    }

    function createBackButton()
    {
        $("#game_background").append('<button id="create_table">Create</button>');
    }

    function drawSkills(player, skill_graphics, inBattle)
    {
        skill_graphics.drawSkillsSG(player, inBattle);
        drawConnenctingLines(player);
    }

    function drawConnenctingLines(player)
    {
        $(".line").remove();
        for(let i=0; i<player.items.length; i++)
        {
            if(player.items[i].rank !== -1)
            {
                $("#game_background").append(drawLine(i));
            }
        }
    }

    function drawInventory(engine, player, skill_graphics)
    {
        engine.logInventory();
        drawBag(player, engine, skill_graphics);
        drawItems(player, engine, skill_graphics);
        drawCharacter();
        //drawPlayerItems();
    }

    function drawCharacter()
    {
        $("#game_background").append('<div id="inventory_character"></div>');
    }

    function drawItems(player, engine, skill_graphics)
    {
        $("#game_background").append('<div id="items"></div>');
        for(let i=0; i<player.getSkills().length; i++)
        {
            $("#items").append(createField("item_" + i, 0, i, player.items[i], false));

            allignToMiddle($("#item_" + i).children().first());
            allignToMiddleY($("#item_" + i).children().first());
            let accepting = "";
            switch(player.items[i].type)
            {
                case C_HEAD:
                {
                    accepting = S_HEAD;
                    break;
                }

                case C_NECKLACE:
                {
                    accepting = S_NECKLACE;
                    break;
                }

                case C_TORSO:
                {
                    accepting = S_TORSO;
                    break;
                }

                case C_LEFT_HAND:
                {
                    accepting = S_LEFT_HAND;
                    break;
                }

                case C_RIGHT_HAND:
                {
                    accepting = S_RIGHT_HAND;
                    break;
                }

                case C_BOOTS:
                {
                    accepting = S_BOOTS;
                    break;
                }

                default:
                {
                    accepting = "nothing";
                    break;
                }
            }
            $("#item_" + i).children().first().addClass("ui-widget-content");
            $("#item_" + i).addClass("ui-widget-header");

            $("#item_" + i).droppable(
                {
                    hoverClass: 'item_hover',
                    accept: "." + accepting,
                    drop: function(event, ui)
                    {
                        let parent = "#" + ui.draggable.parent().attr("id");
                        let target  = "#" + $(this).attr("id");

                        let parent_class = ui.draggable.parent().attr("class");
                        let target_class = $(this).attr("class");

                        let type_of_put = decideTypeOfPut(parent.length);

                        $(parent).removeClass();
                        $(target).removeClass();
                        $(target).addClass(parent_class);
                        $(parent).addClass(target_class);

                        if(type_of_put === BAG_TO_CHARACTER)
                        {
                            if(player.items[target[6]].rank === -1)
                            {
                                player.wearItem(target[6], engine.getBagItem(parent[7], parent[3]));
                                engine.deleteItem(parent[7], parent[3]);
                                let element = $(parent).children().first().detach();
                                $(target).append(element);
                                allignToMiddle(element);
                                allignToMiddleY(element);
                            }
                            else
                            {
                                let tmp = engine.getBagItem(parent[7], parent[3]);
                                engine.deleteItem(parent[7], parent[3]);
                                engine.addItem(parent[7], parent[3], player.items[target[6]]);
                                player.wearItem(target[6], tmp);

                                let element = $(parent).children().first().detach();
                                $(target).append(element);
                                allignToMiddle(element);
                                allignToMiddleY(element);

                                element = $(target).children().first().detach();
                                $(parent).append(element);
                                allignToMiddle(element);
                                allignToMiddleY(element);
                            }

                            $(target).children().first().addClass("using");
                            $(target).children().first().removeClass("ui-widget-content");
                            $(parent).children().first().removeClass("using");

                            engine.changeSkills(player);
                            updateSkills(player, skill_graphics);
                            engine.logInventory();
                            player.logItems();
                            changeBagsDroppables();
                        }

                        if(type_of_put === CHARACTER_TO_CHARACTER)
                        {
                            if(player.items[target[6]].rank === -1)
                            {
                                let tmp = player.items[parent[6]];
                                player.wearItem(parent[6], player.items[target[6]]);
                                player.wearItem(target[6], tmp);

                                let element = $(parent).children().first().detach();
                                $(target).append(element);
                                allignToMiddle(element);
                                allignToMiddleY(element);
                            }
                            else
                            {
                                let tmp = player.items[parent[6]];
                                player.wearItem(parent[6], player.items[target[6]]);
                                player.wearItem(target[6], tmp);

                                let element = $(parent).children().first().detach();
                                $(target).append(element);
                                allignToMiddle(element);
                                allignToMiddleY(element);

                                element = $(target).children().first().detach();
                                $(parent).append(element);
                                allignToMiddle(element);
                                allignToMiddleY(element);
                            }

                            engine.changeSkills(player);
                            updateSkills(player, skill_graphics);
                            player.logItems();
                        }
                    }
                });
        }
    }

    function decideTypeOfPut(type)
    {
        switch(type)
        {
            case 7:
                return CHARACTER_TO_CHARACTER;
            case 8:
                return BAG_TO_CHARACTER;
            case 6:
                return BAG_TO_BAG;
            case 5:
                return CHARACTER_TO_BAG;
        }
    }

    function getItemType($object)
    {
        if($object.hasClass(S_HEAD))       return "." + S_HEAD;
        if($object.hasClass(S_NECKLACE))   return "." + S_NECKLACE;
        if($object.hasClass(S_TORSO))      return "." + S_TORSO;
        if($object.hasClass(S_LEFT_HAND))  return "." + S_LEFT_HAND;
        if($object.hasClass(S_RIGHT_HAND)) return "." + S_RIGHT_HAND;
        if($object.hasClass(S_BOOTS))      return "." + S_BOOTS;
    }

    function changeBagsDroppables()
    {
        for(let i=0; i<bag.height; i++)
        {
            for(let j=0; j<bag.width; j++)
            {
                if($("#y_" + i + "_x_" + j).children().first().hasClass("item"))
                {
                    $("#y_" + i + "_x_" + j).children().first().removeClass("using");
                    $("#y_" + i + "_x_" + j).children().first().addClass("ui-widget-content");
                    let item_type = ", " + getItemType($("#y_" + i + "_x_" + j).children().first());
                    $("#y_" + i + "_x_" + j).droppable({accept: ".ui-widget-content" + item_type});
                }
                else
                {
                    $("#y_" + i + "_x_" + j).droppable({accept: ".ui-widget-content, .using"});
                }
            }
        }
    }

    function drawBag(player, engine, skill_graphics)
    {
        /*let a = new BattleGraphics();
        a.drawSkillBars();*/
        //$("#game_background").append('<div class="bag_field"></div>');
        //$("game_background").append(createBagField("alma", 5, 5));
        $("#game_background").append('<div id="bag"></div>');

        for(let i=0; i<bag.height; i++)
        {
            for(let j=0; j<bag.width; j++)
            {
                $("#bag").append(createField("y_" + i + "_x_" + j, j, i, engine.getBagItem(j, i), true));

                allignToMiddle($("#y_" + i + "_x_" + j).children().first());
                allignToMiddleY($("#y_" + i + "_x_" + j).children().first());
                addType($("#y_" + i + "_x_" + j).children().first(), engine.getBagItem(j, i).type);
                $("#y_" + i + "_x_" + j).children().first().addClass("ui-widget-content");
                $("#y_" + i + "_x_" + j).addClass("ui-widget-header");

                $("#y_" + i + "_x_" + j).droppable(
                    {
                        hoverClass: 'item_hover',
                        accept: ".ui-widget-content",
                        drop: function(event, ui)
                        {
                            let parent = "#" + ui.draggable.parent().attr("id");
                            let target  = "#" + $(this).attr("id");

                            let parent_class = ui.draggable.parent().attr("class");
                            let target_class = $(this).attr("class");


                            //$(parent).droppable({accept: ".ui-widget-content"});

                            let type_of_put = decideTypeOfPut(parent.length-2);

                            $(parent).removeClass();
                            $(target).removeClass();
                            $(target).addClass(parent_class);
                            $(parent).addClass(target_class);

                            if(type_of_put === BAG_TO_BAG)
                            {
                                if(engine.getImage(target[7], target[3]) === EMPTY)
                                {
                                    engine.addItem(target[7], target[3], engine.getBagItem(parent[7], parent[3]));
                                    engine.deleteItem(parent[7], parent[3]);

                                    let element = $(parent).children().first().detach();
                                    $(target).append(element);

                                    allignToMiddle(element);
                                    allignToMiddleY(element);
                                }
                                else
                                {
                                    engine.swapItems(parent[7], parent[3], target[7], target[3]);

                                    let element = $(parent).children().first().detach();
                                    $(target).append(element);
                                    allignToMiddle(element);
                                    allignToMiddleY(element);

                                    element = $(target).children().first().detach();
                                    $(parent).append(element);
                                    allignToMiddle(element);
                                    allignToMiddleY(element);
                                }
                                engine.logInventory();
                            }

                            if(type_of_put === CHARACTER_TO_BAG)
                            {
                                if(engine.getImage(target[7], target[3]) === EMPTY)
                                {
                                    engine.addItem(target[7], target[3], player.items[parent[6]]);
                                    player.deleteItem(parent[6]);

                                    let element = $(parent).children().first().detach();
                                    $(target).append(element);
                                    allignToMiddle(element);
                                    allignToMiddleY(element);
                                }
                                else
                                {
                                    let tmp = engine.getBagItem(target[7], target[3]);
                                    engine.addItem(target[7], target[3], player.items[parent[6]]);
                                    player.wearItem(parent[6], tmp);

                                    let element = $(parent).children().first().detach();
                                    $(target).append(element);
                                    allignToMiddle(element);
                                    allignToMiddleY(element);

                                    element = $(target).children().first().detach();
                                    $(parent).append(element);
                                    allignToMiddle(element);
                                    allignToMiddleY(element);
                                }

                                engine.changeSkills(player);
                                updateSkills(player, skill_graphics);
                                engine.logInventory();
                                player.logItems();
                                changeBagsDroppables();
                            }
                        }
                    });
                $("#y_" + i + "_x_" + j).children().first().draggable(
                    {
                        revert: "invalid",
                        cursorAt: { top: $("#y_" + i + "_x_" + j).children().first().outerHeight()/2, left: $("#y_" + i + "_x_" + j).children().first().outerWidth()/2 },
                    });

            }
        }
        changeBagsDroppables();
    }

    function addType($object, type)
    {
        switch(type)
        {
            case C_HEAD:
            {
                $object.addClass(S_HEAD);
                break;
            }

            case C_NECKLACE:
            {
                $object.addClass(C_NECKLACE);
                break;
            }

            case C_TORSO:
            {
                $object.addClass(C_TORSO);
                break;
            }

            case C_LEFT_HAND:
            {
                $object.addClass(S_LEFT_HAND);
                break;
            }

            case C_RIGHT_HAND:
            {
                $object.addClass(S_RIGHT_HAND);
                break;
            }

            case C_BOOTS:
            {
                $object.addClass(S_BOOTS);
                break;
            }
        }
    }

    function createField(id, x, y, item, inBag)
    {
        let $object = $('<div></div>');

        if(inBag)
        {
            $object.attr("id", id);
            $object.addClass("inventory_field");

            $object.css('left', (x*(bag.field_size))-x+1);
            $object.css('top',  (y*(bag.field_size))-y+1);
        }
        else
        {
            $object.attr("id", id);
            $object.addClass("inventory_field");

            $object.css('left', (x*(bag.field_size))-x+1);
            $object.css('top',  (y*(bag.field_size))-y+1+(y*7));
        }

        switch(item.image)
        {
            case SWORD:
            {
                $object.append('<div class="item sword"></div>');
                break;
            }

            case NECKLACE:
            {
                $object.append('<div class="item necklace"></div>');
                break;
            }
        }

        switch(item.rank)
        {
            case -1:
            {
                $object.addClass("grey");
                break;
            }

            case 0:
            {
                $object.addClass("grey");
                break;
            }

            case 1:
            {
                $object.addClass("white");
                break;
            }

            case 2:
            {
                $object.addClass("green");
                break;
            }
        }

        return $object;
    }

    function allignToMiddle(object)
    {
        let object_width = $(object).outerWidth();
        let parent_object_width = $(object).parent().outerWidth();

        $(object).css("left", (parent_object_width-object_width)/2-1);
    }

    function allignToMiddleY(object)
    {
        let object_height = $(object).outerHeight();
        let parent_object_height = $(object).parent().outerHeight();

        $(object).css("top", (parent_object_height-object_height)/2-1);
    }
}