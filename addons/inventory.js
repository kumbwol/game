function Inventory()
{
    let bag = {
        height: 7,
        width: 6,
        field_size: 53
    };

    let graphics = new InventoryGraphics(bag);
    let engine = new InventoryEngine(bag);

    engine.addItem(0, 0, SWORD);
    engine.addItem(1, 1, NECKLACE);

    this.showInventory = showInventory;


    function showInventory()
    {
        graphics.drawInventory(engine);
    }

    $("#game_background").on("mousedown", ".sword, .necklace", function()
    {
        $(this).css("z-index", 2);
        //$(".sword").css("z-index", 2);
    });
}