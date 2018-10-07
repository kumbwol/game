function InventoryEngine(bag)
{
    this.inventory = [];

    this.logInventory = logInventory;
    this.getType = getType;
    this.addItem = addItem;
    this.deleteItem = deleteItem;

    for(let i=0; i<bag.height; i++)
    {
        this.inventory[i] = [];
        for(let j=0; j<bag.width; j++)
        {
            this.inventory[i][j] = new Item(0, 0);
        }
    }

    function addItem(x, y, type)
    {
        this.inventory[parseInt(y)][parseInt(x)].type = type;
    }

    function deleteItem(x, y)
    {
        this.inventory[parseInt(y)][parseInt(x)].type = EMPTY;
    }

    function getType(x, y)
    {
        return this.inventory[y][x].type;
    }

    function logInventory()
    {
        for(let i=0; i<bag.height; i++)
        {
            let row_string = "";
            for(let j=0; j<bag.width; j++)
            {

                row_string += (this.inventory[i][j].type + " ");
            }
            console.log(row_string);
            console.log("\n");
        }
        console.log("----------------------");
    }
}