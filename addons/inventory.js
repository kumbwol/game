function Inventory(player, skill_graphics)
{
    let bag = {
        height: 7,
        width: 6,
        field_size: 53
    };

    let engine = new InventoryEngine(bag);
    let graphics = new InventoryGraphics(bag);

    engine.addItem(0, 0, new Item(C_LEFT_HAND,  1, SWORD));
    engine.addItem(1, 1, new Item(C_RIGHT_HAND, 1, NECKLACE));
    engine.addItem(0, 1, new Item(C_HEAD,       2, NECKLACE));

    this.showInventory = showInventory;

    function showInventory()
    {
        graphics.drawInventory(engine, player, skill_graphics);

        $("#game_background").append('<div id="player_profile" class="inventory_skill"></div>');
        graphics.drawSkills(player, skill_graphics, false);
        skill_graphics.drawSkillRanks(player, false);
        graphics.createBackButton();
        graphics.changeSkillsButton();

    }

    $("#game_background").on("mousedown", ".sword, .necklace", function()
    {
        $(this).css("z-index", 3);
    });

    $("#game_background").on("mouseup", ".sword, .necklace", function()
    {
        $(this).css("z-index", 1);
    });

    $("#game_background").on("click", "#change_skills", function()
    {
        engine.changeSkills(player);
        graphics.updateSkills(player, skill_graphics);

    });

    $("#game_background").on("click", "#exit_rank_explainer_in_inventory", function()
    {
        $("#player_profile").remove();
        $("#game_background").append('<div id="player_profile" class="inventory_skill"></div>');
        graphics.drawSkills(player, skill_graphics, false);
        skill_graphics.removeRankHighlight();
    });
}
