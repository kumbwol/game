$(function()
{

    let main = new MainGame();
    let player;
    let cursor;

    let first_checkpoint_reached = false;
    let in_CP_run = false;
    let loot_LVL = 0;

    function MainGame()
    {

        this.winBattle = winBattle;
        this.looseBattle = looseBattle;

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
        let enemy_lvl_CP = 1;


        function start()
        {
            done = true;

            if(loot_LVL > 0)
            {
                $("#game_background").append('<button id="loot"></button>');
                $("#loot").html("Treasure LVL - " + (loot_LVL));
            }


            $("#game_background").append('<button id="create_table"></button>');

            if(first_checkpoint_reached)
            {
                $("#game_background").append('<button id="create_table_CP"></button>');
                $("#create_table_CP").html("(1. Fejezet) Battle - " + enemy_lvl_CP + " / 3");
                $("#create_table").html("(2. Fejezet) Battle - " + enemy_lvl);
            }
            else
            {
                $("#create_table").html("Battle - " + enemy_lvl);
            }

            $("#game_background").append('<button id="inventory">Inventory</button>');


            $("#game_background").on("click", "#create_table", function()
            {
                in_CP_run = false;
                deletePage(true);
                x = new Battle(player, player.skill_graphics, cursor, main, decideEnemy());
            });

            $("#game_background").on("click", "#create_table_CP", function()
            {
                in_CP_run = true;
                deletePage(true);
                x = new Battle(player, player.skill_graphics, cursor, main, decideEnemy());
            });

            $("#game_background").on("click", "#loot", function()
            {
                $("#loot").remove();



                $("#game_background").append('<p id="new_item">Nezd meg az inventoryban az uj itemet!</p>');

                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));
                player.inventory.addItem(new Item(RANDOM_ITEM, 3, ITEM_RANDOM));

                player.hp = player.max_hp;

                enemy_lvl_CP = 1;

                if(first_checkpoint_reached)
                {
                    enemy_lvl = 4;
                    $("#create_table_CP").html("(1. Fejezet) Battle - " + enemy_lvl_CP + " / 3");
                    $("#create_table").html("(2. Fejezet) Battle - " + enemy_lvl);
                }
                else
                {
                    enemy_lvl = 1;
                    $("#create_table").html("Battle - " + enemy_lvl);
                }

                loot_LVL = 0;
            });

            $("#inventory").on("click", function()
            {
                deletePage(false);

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

        function endBattle()
        {
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
            player.ap = player.max_ap;
            player.armor = 0;
            player.mp = player.max_mp / 2;
        }

        function winBattle()
        {
            endBattle();

            if(in_CP_run)
            {
                if(enemy_lvl_CP === 3) enemy_lvl_CP = 1;
                else enemy_lvl_CP++;
            }
            else
            {
                if(enemy_lvl === 3)
                {
                    winChapterOne();
                    first_checkpoint_reached = true;
                    enemy_lvl_CP = 1;

                }
                enemy_lvl++;
            }

            if(in_CP_run)
            {
                if(enemy_lvl_CP > 1)
                {
                    loot_LVL = enemy_lvl_CP - 1;
                }
                else
                {
                    winChapterOne();
                }
            }
            else if(first_checkpoint_reached)
            {
                if(enemy_lvl > 4)
                {
                    loot_LVL = enemy_lvl - 1;
                }
            }
            else if(enemy_lvl > 1)
            {
                loot_LVL = enemy_lvl - 1;
            }

            start();
        }

        function winChapterOne()
        {
            $("#game_background").append('<button id="loot"></button>');
            $("#loot").html("New Skill");
        }

        function looseBattle()
        {
            endBattle();

            enemy_lvl_CP = 1;

            if(first_checkpoint_reached)
            {
                enemy_lvl = 4;
            }
            else
            {
                enemy_lvl = 1;
            }

            loot_LVL = 0;


            player.hp = player.max_hp;

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

            $("#create_table").remove();
            $("#create_table_CP").remove();

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
            $("#enemy_armor").remove();
            $("#armor").remove();
        }

        function decideEnemy()
        {
            //console.log()
            if(in_CP_run)
            {
                //if(enemy_lvl_CP === 1) return "Fagyaszt";
                if(enemy_lvl_CP === 1) return "Pixi";
                if(enemy_lvl_CP === 2) return "Skeleton";
                if(enemy_lvl_CP === 3) return "Spider";
                if(enemy_lvl_CP === 4) return "Succubus";
            }
            else
            {
                //if(enemy_lvl_CP === 1) return "Fagyaszt";
                if(enemy_lvl === 1) return "Pixi";
                //if(enemy_lvl === 1) return "Spider";
                if(enemy_lvl === 2) return "Skeleton";
                if(enemy_lvl === 3) return "Spider";
                if(enemy_lvl === 4) return "Succubus";
            }
        }
    }




});
