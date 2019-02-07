$(function()
{
    start_program();

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
            $.getScript("addons/ability_types.js"),
            $.getScript("addons/ability.js"),
            $.getScript("addons/battle.js"),
            $.getScript("addons/item_images.js"),
            $.getScript("addons/item_types.js"),
            $.getScript("addons/inventory_engine.js"),
            $.getScript("addons/inventory_graphics.js"),
            $.getScript("addons/inventory.js"),
            $.getScript("addons/item.js"),
            $.getScript("addons/skill_graphics.js"),
            $.getScript("addons/skill_engine.js"),
            $.getScript("addons/cursor.js"),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function()
        {
            $.when
            (
                $.getScript("addons/preloader.js"),
                $.Deferred(function( deferred ){
                    $( deferred.resolve );
                })
            ).done(function()
            {
                $.getScript("addons/paragraphs.js");
                do {
                    //TODO: Itt kene egy downloading/loading gif vagy vmi
                    console.log("ragadok");
                }while(!preload_finished);

                $("#game_background").append('<button id="create_table">Create</button>');
                $("#game_background").append('<button id="inventory">Inventory</button>');
                let player = new Player("Kumbi");
                let cursor = new Cursor();
                cursor.createCursor();

                $("#game_background").on("click", "#create_table", function()
                {
                    deletePage();
                    new Battle(player, player.skill_graphics, cursor);
                });

                $("#inventory").on("click", function()
                {
                    deletePage();

                    player.inventory.showInventory();
                });

                $(window).mousemove(function(event) {
                    $('#mouse-pointer').css({
                        'top' : event.pageY + 'px',
                        'left' : event.pageX + 'px'
                    });
                });


            });
        });
    }

    function deletePage()
    {
        /*$("#game_background").remove();
        $('body').append('<div id="game_background"></div>');*/

        $(".font_preloader0").remove();
        $(".font_preloader1").remove();
        $(".font_preloader2").remove();
        $("#inventory").remove();
        $("#create_table").remove();
        $("#change_skills").remove();
        $("#bag").remove();
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
        $(".line").remove();
        $(".item").remove();
    }


});
