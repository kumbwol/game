function InventoryGraphics(bag)
{
    this.drawInventory = drawInventory;

    function drawInventory(engine)
    {
        $(".font_preloader0").remove();
        $(".font_preloader1").remove();
        $(".font_preloader2").remove();
        $("#create_table").remove();
        $("#inventory").remove();

        engine.logInventory();
        drawBag(engine);
    }

    function drawBag(engine)
    {
        //$("#game_background").append('<div class="bag_field"></div>');
        //$("game_background").append(createBagField("alma", 5, 5));
        for(let i=0; i<bag.height; i++)
        {
            for(let j=0; j<bag.width; j++)
            {
                $("#game_background").append(createBagField("y_" + i + "_x_" + j, j, i, engine.getType(j, i)));

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

                            if(engine.getType(target[7], target[3]) === EMPTY)
                            {
                                engine.addItem(target[7], target[3], engine.getType(parent[7], parent[3]));
                                engine.deleteItem(parent[7], parent[3]);

                                let element = $(parent).children().first().detach();
                                $(target).append(element);

                                allignToMiddle(element);
                                allignToMiddleY(element);

                                engine.logInventory();
                            }
                            else
                            {
                                let element = $(parent).children().first();
                                allignToMiddle(element);
                                allignToMiddleY(element);

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

    function createBagField(id, x, y, type)
    {
        let shiftX = 500;
        let shiftY = 10;
        let $object = $('<div></div>');

        $object.attr("id", id);
        $object.addClass("bag_field");

        $object.css('left', shiftX + (x*(bag.field_size))-x+1);
        $object.css('top',  shiftY + (y*(bag.field_size))-y+1);

        switch(type)
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

        return $object;
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
}