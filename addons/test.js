$(function()
{

    let main = new MainGame();
    let player;
    let cursor;

    function MainGame()
    {

        this.winBattle = winBattle;

        start_program();

        let x;

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
                    let x = setInterval(function(){
                        fontSpy('myLato', { //TODO: A tobbit fontot is elleorizni kene
                            success: function() {

                                clearInterval(x);
                                if(!done)
                                {
                                    player = new Player("Kumbi");
                                    cursor = new Cursor();
                                    cursor.createCursor();
                                    start();
                                }
                            },
                            failure: function() {
                                //TODO: Itt kene egy downloading/loading gif vagy vmi
                                console.log("ragadok");
                            }
                        });
                    }, 20);

                });
            });
        }

        let done = false;
        let enemy_lvl = 1;


        function start()
        {
            done = true;
            $("#game_background").append('<button id="create_table"></button>');
            $("#game_background").append('<button id="inventory">Inventory</button>');
            if(enemy_lvl > 1)
            {
                $("#game_background").append('<button id="loot"></button>');
                $("#loot").html("Treasure LVL - " + (enemy_lvl - 1));
            }

            $("#create_table").html("Battle - " + enemy_lvl);


            $("#game_background").on("click", "#create_table", function()
            {
                deletePage(true);
                x = new Battle(player, player.skill_graphics, cursor, main, decideEnemy());
            });

            $("#game_background").on("click", "#loot", function()
            {
                $("#loot").remove();
                enemy_lvl = 1;
                $("#create_table").html("Battle - " + enemy_lvl);
                $("#game_background").append('<p id="new_item">Nezd meg az inventoryban az uj itemet!</p>');

                player.inventory.addItem(new Item(C_HEAD,       2, NECKLACE));
            });

            $("#inventory").on("click", function()
            {
                deletePage(false);

                $("#game_background").on("click", "#create_table", function()
                {
                    deletePage(true);
                    x = new Battle(player, player.skill_graphics, cursor, main, decideEnemy());
                });

                player.inventory.showInventory();

                $("#back_button").on("click", function()
                {
                    console.log("kumbi");
                    deletePage(true);
                    start();
                });
            });



            $(window).mousemove(function(event) {
                $('#mouse-pointer').css({
                    'top' : event.pageY + 'px',
                    'left' : event.pageX + 'px'
                });
            });


        }

        function winBattle()
        {
            /*$("#game_background").remove();
            $('body').append('<div id="game_background"></div>');*/
            $("#game_background").unbind();

            $("#items").remove();
            $("#inventory_character").remove();
            $("#battle_table").remove();
            $("#ability_point_bg").remove();
            $("#end_turn").remove();
            $("#player_ability_container").remove();
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
            $("#enemy_profile").remove();
            $("#player_profile").remove();
            $(".item").remove();
            deletePage(true);

            enemy_lvl++;

            start();
        }

        function deletePage(toBattle)
        {
            /*$("#game_background").remove();
            $('body').append('<div id="game_background"></div>');
            cursor.createCursor();*/

            $("#game_background").unbind();


            $(".font_preloader0").remove();
            $(".font_preloader1").remove();
            $(".font_preloader2").remove();
            $("#inventory").remove();
            if(toBattle) $("#create_table").remove();
            $("#loot").remove();
            $("#back_button").remove();
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
            $("#new_item").remove();
            $("#destroy_item_field").remove();
            $("#inventory_character").remove();
            $(".inventory_field").remove();
            $(".active_skill").remove();
            $("#items").remove();
            $("#player_profile").remove();
        }

        function decideEnemy()
        {
            //console.log()
            if(enemy_lvl === 1) return "Test";
            if(enemy_lvl === 2) return "Develop";
            if(enemy_lvl === 3) return "Skeleton";

        }
    }




});
