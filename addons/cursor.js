function Cursor()
{
    this.changeCursor = changeCursor;
    this.createCursor = createCursor;
    this.hideCursor = hideCursor;
    this.showCursor = showCursor;

    function hideCursor()
    {
        $("#mouse-pointer").css("visibility", "hidden");
    }

    function showCursor()
    {
        $("#mouse-pointer").css("visibility", "visible");
    }

    function createCursor()
    {
        $("#game_background").css("cursor", "none");
        $("#game_background").append('<figure id="mouse-pointer"></figure>');
    }

    function changeCursor(player, engine)
    {
        if(engine.isAbilitySelected())
        {
            if(engine.isSpecialAbilitySelected(player))
            {
                $("#mouse-pointer").css("background-image", 'url("addons/images/cursor/use_ability.png")');
            }
            else
            {
                $("#mouse-pointer").css("background-image", 'url("addons/images/cursor/default.png")');
            }
        }
        else
        {
            $("#mouse-pointer").css("background-image", 'url("addons/images/cursor/default.png")');
        }
    }
}
