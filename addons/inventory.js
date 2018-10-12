function Inventory(player)
{
    let bag = {
        height: 7,
        width: 6,
        field_size: 53
    };

    let engine = new InventoryEngine(bag);
    let graphics = new InventoryGraphics(bag);

    engine.addItem(0, 0, new Item(SWORD, 1));
    engine.addItem(1, 1, new Item(NECKLACE, 2));

    this.showInventory = showInventory;

    function showInventory()
    {
        graphics.drawInventory(engine);

        $("#game_background").append('<div id="player_profile" class="inventory_skill"></div>');
        graphics.drawSkills(player, false);
        graphics.createBackButton();
        graphics.changeSkillsButton();
    }

    $("#game_background").on("mousedown", ".sword, .necklace", function()
    {
        $(this).css("z-index", 2);
    });

    $("#game_background").on("click", "#change_skills", function()
    {
        engine.changeSkills(player);
    });
}