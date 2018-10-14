function InventoryEngine(bag)
{
    this.inventory = [];

    this.logInventory = logInventory;
    this.getImage = getImage;
    this.getItem = getItem;
    this.addItem = addItem;
    this.deleteItem = deleteItem;
    this.swapItems = swapItems;
    this.changeSkills = changeSkills;

    function changeSkills(player)
    {
        player.skill_engine.resetSkills(player);
        player.skill_engine.updateSkills(player);
    }

    for(let i=0; i<bag.height; i++)
    {
        this.inventory[i] = [];
        for(let j=0; j<bag.width; j++)
        {
            this.inventory[i][j] = new Item(EMPTY, EMPTY, 0);
        }
    }

    function swapItems(x1, y1, x2, y2)
    {
        let temp = this.inventory[parseInt(y1)][parseInt(x1)];
        this.inventory[parseInt(y1)][parseInt(x1)] = this.inventory[parseInt(y2)][parseInt(x2)];
        this.inventory[parseInt(y2)][parseInt(x2)] = temp;
    }

    function addItem(x, y, item)
    {
        this.inventory[parseInt(y)][parseInt(x)] = item;
    }

    function deleteItem(x, y)
    {
        this.inventory[parseInt(y)][parseInt(x)] = new Item(EMPTY, EMPTY, 0);
    }

    function getImage(x, y)
    {
        return this.inventory[y][x].image;
    }

    function getItem(x, y)
    {
        return this.inventory[y][x];
    }

    function logInventory()
    {
        for(let i=0; i<bag.height; i++)
        {
            let row_string = "";
            for(let j=0; j<bag.width; j++)
            {

                row_string += (this.inventory[i][j].image + " ");
            }
            console.log(row_string);
            console.log("\n");
        }
        console.log("----------------------");
    }
}