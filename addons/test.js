$(function()
{
    start_program();

    function start_game()
    {
        let battle_table = {
            height: 9,
            width: 9
        };

        let skill =
        {
            height: 0,
            width: 0,
            moving: false
        };

        let engine = new BattleEngine(battle_table);
        let player = new Player("Kumbi");
        let graphics = new BattleGraphics(battle_table, engine, player);

        $("#create_table").on("click", function()
        {
            engine.fillUpTable();
            //engine.logTable();
            //var graphics = new BattleGraphics(battle_table.height, battle_table.width);
            graphics.drawSkillBar(player);
            graphics.drawTable(battle_table);
            //graphics.drawTopBar();
        });

        $("#game_background").on("click", ".attack, .mana, .defense, .move", function()
        {
            //alert($(this).attr("id"));
            //alert(y + " " + x);
            //alert(engine.allow_select);
            if(engine.allow_select && !skill.moving)
            {
                let y = ($(this).attr("id"))[2];
                let x = ($(this).attr("id"))[6];
                if(!engine.selectField(y, x))
                {
                    if(engine.table[y][x].selected) graphics.drawSelector($(this).attr("id"));
                    else graphics.deleteSelector($(this).attr("id"));
                }
                else
                {
                    graphics.deleteSelector(engine.selected_field_id);
                    graphics.swapFields(engine);
                    //$(this).animate({"top": "0px", "left": "0px"}, 1000);
                }
            }
            if(skill.moving)
            {
                //alert('szia');
                $(this).remove();
                $("#y_" + (parseInt($(this).attr("id")[2])-1).toString() + "_x_" + parseInt($(this).attr("id")[6])).remove();
                //alert($(this).attr("id"));
                engine.deleteField(parseInt($(this).attr("id")[6]), parseInt($(this).attr("id")[2]));
                engine.deleteField(parseInt($(this).attr("id")[6]), parseInt($(this).attr("id")[2])-1);
                engine.logTable();


                graphics.reNameIds(engine, parseInt($(this).attr("id")[6]));
                graphics.reFillTable(engine);
                engine.refreshTable();
                //engine.refreshTable();
                engine.logTable();
                //graphics.drawTable();
            }
        });

        $("#game_background").on("click", "#skill_1, #skill_2, #skill_3, #skill_4, #skill_5, #skill_6", function(ev)
        {
            if(skill.moving) $(".selected_skill").remove();
            let skill_id = $(this).attr("id");
            graphics.drawSelectedSkill(player, parseInt(skill_id[6])-1, skill);

            if(ev.pageX<960-skill.width +24 && ev.pageX>23) $(".selected_skill").css("left", ev.pageX-23);
            else $(".selected_skill").css("left", 0);
            if(ev.pageY<540-skill.height+24 && ev.pageY>23) $(".selected_skill").css("top",  ev.pageY-23);
            else $(".selected_skill").css("top", 540-skill.height);

            skill.moving = true;
        });


        $("#game_background").on("mousemove", function(ev)
        {
            if(skill.moving)
            {
                if(ev.pageX<960-skill.width +24 && ev.pageX>23) $(".selected_skill").css("left", ev.pageX-23);
                if(ev.pageY<540-skill.height+24 && ev.pageY>23) $(".selected_skill").css("top",  ev.pageY-23);
            }
        });

        $("#game_background").on("contextmenu", function()
        {
            if(skill.moving)
            {
                $(".selected_skill").remove();
                skill.moving = false;
                skill.height = 0;
                skill.width  = 0;
            }
            return false;
        });

        /*$("#game_background").on("click", function()
        {
            $("#game_background").append('<div class="teszt animated bounceInDown"></div>');
            //alert('szia');
        });*/

        $("#game_background").on("mouseenter", ".move", function()
        {
            if(skill.moving)
            {
                //alert("szia");
            }
        });

    }

    function start_program()
    {
        $.when
        (
            $.getScript("addons/battle_engine.js"),
            $.getScript("addons/battle_graphics.js"),
            $.getScript("addons/player.js"),
            $.getScript("addons/field.js"),
            $.getScript("addons/field_types.js"),
            $.getScript("addons/config.js"),
            $.getScript("addons/skillpattern.js"),
            $.getScript("addons/skill.js"),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function()
        {
            start_game();
        });
    }
});