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
            $.getScript("addons/item_types.js"),
            $.getScript("addons/inventory_engine.js"),
            $.getScript("addons/inventory_graphics.js"),
            $.getScript("addons/inventory.js"),
            $.getScript("addons/item.js"),
            $.getScript("addons/skill_graphics.js"),
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


                $("#create_table").on("click", function()
                {
                    deletePage();
                    new Battle();
                });

                $("#inventory").on("click", function()
                {
                    deletePage();
                    let player = new Player("Kumbi");
                    let rank = [];

                    for(let i=0; i<6; i++) rank[i]=0;

                    player.inventory.showInventory(player, rank);
                });


            });
        });
    }

    function deletePage()
    {
        $(".font_preloader0").remove();
        $(".font_preloader1").remove();
        $(".font_preloader2").remove();
        $("#create_table").remove();
        $("#inventory").remove();
    }


});