function InventoryEngine(bag)
{
    this.inventory = [];

    this.logInventory = logInventory;
    this.getImage = getImage;
    this.getBagItem = getBagItem;
    this.addItem = addItem;
    this.deleteItem = deleteItem;
    this.swapItems = swapItems;
    this.changeSkills = changeSkills;
    this.inInventory = inInventory;

    function inInventory()
    {
        return $("#bag").length;
    }

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
            this.inventory[i][j] = new Item(-1, EMPTY, 0);
        }
    }

    function swapItems(x1, y1, x2, y2)
    {
        let temp = this.inventory[parseInt(y1)][parseInt(x1)];
        this.inventory[parseInt(y1)][parseInt(x1)] = this.inventory[parseInt(y2)][parseInt(x2)];
        this.inventory[parseInt(y2)][parseInt(x2)] = temp;
    }

    function addItem(item, x = -1, y = -1)
    {
        if(x < 0 || y < 0)
        {
            let item_placed = false;
            for(let i=0; i<7; i++)
            {
                for(let j=0; j<6; j++)
                {
                    if(this.getImage(j, i) === EMPTY)
                    {
                        this.inventory[i][j] = item;
                        item_placed = true;
                        break;
                    }
                }
                if(item_placed)
                {
                    break;
                }
            }
        }
        else
        {
            this.inventory[parseInt(y)][parseInt(x)] = item;
        }
    }

    function deleteItem(x, y)
    {
        this.inventory[parseInt(y)][parseInt(x)] = new Item(EMPTY, EMPTY, 0);
    }

    function getImage(x, y)
    {
        return this.inventory[y][x].image;
    }

    function getBagItem(x, y)
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
