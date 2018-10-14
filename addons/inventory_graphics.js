function InventoryGraphics(bag)
{
    this.drawInventory = drawInventory;
    this.drawSkills = drawSkills;
    this.createBackButton = createBackButton;
    this.changeSkillsButton = changeSkillsButton;
    this.updateSkills = updateSkills;

    function updateSkills(player, skill_graphics)
    {
        $("#player_profile").remove();
        $(".trapezoid_border").remove();

        $("#game_background").append('<div id="player_profile" class="inventory_skill"></div>');
        drawSkills(player, skill_graphics, false);
        skill_graphics.drawSkillRanks(player, false);
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
    }

    function drawInventory(engine)
    {
        engine.logInventory();
        drawBag(engine);
        //drawPlayerItems();
    }

    function drawBag(engine)
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
                $("#bag").append(createBagField("y_" + i + "_x_" + j, j, i, engine.getItem(j, i)));

                allignToMiddle($("#y_" + i + "_x_" + j).children().first());
                allignToMiddleY($("#y_" + i + "_x_" + j).children().first());
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

                            engine.logInventory();

                            $(parent).removeClass();
                            $(target).removeClass();
                            $(target).addClass(parent_class);
                            $(parent).addClass(target_class);

                            if(engine.getImage(target[7], target[3]) === EMPTY)
                            {
                                engine.addItem(target[7], target[3], engine.getItem(parent[7], parent[3]));
                                engine.deleteItem(parent[7], parent[3]);

                                let element = $(parent).children().first().detach();
                                $(target).append(element);

                                allignToMiddle(element);
                                allignToMiddleY(element);

                                engine.logInventory();
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

                                engine.logInventory();
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
    }

    function createBagField(id, x, y, item)
    {
        let $object = $('<div></div>');

        $object.attr("id", id);
        $object.addClass("bag_field");

        $object.css('left', (x*(bag.field_size))-x+1);
        $object.css('top',  (y*(bag.field_size))-y+1);

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