console.log("battle_engine.js loaded");

function BattleEngine(battle_table)
{
    this.battle_table = battle_table;
    this.table = [];
    this.selected_fields = {
        y0: -1,
        x0: -1,
        y1: -1,
        x1: -1
    };
    this.selected_field_id = "";
    this.allow_select = true;

    for(let i=0; i<this.battle_table.height; i++)
    {
        this.table[i] = [];
        for(let j=0; j<this.battle_table.width; j++)
        {
            this.table[i][j] = new Field(NUL);
        }
    }

    this.logTable = logTable;
    this.fillUpTable = fillUpTable;
    this.selectField = selectField;
    this.deleteField = deleteField;
    this.refreshTable = refreshTable;

    function refreshTable()
    {
        for(let i=0; i<this.battle_table.width; i++)
        {
            for(let j=0; j<this.battle_table.height; j++)
            {
                if(this.table[j][i].type==NUL)
                {
                    for(let k=j; k>=1; k--)
                    {
                        this.table[k][i].type = this.table[k-1][i].type;
                        this.table[k-1][i].type = NUL;
                    }
                }
            }
        }

        //this.fillUpTable();
    }

    function deleteField(x, y)
    {
        this.table[y][x].type = NUL;
    }

    function selectField(y, x)
    {
        let swap_field = false;
        if(this.table[y][x].selected)
        {
            this.table[y][x].selected = false;

            this.selected_fields.y0 = -1;
            this.selected_fields.x0 = -1;
            this.selected_fields.y1 = -1;
            this.selected_fields.x1 = -1;
        }
        else
        {
            this.table[y][x].selected = true;
            if(this.selected_fields.y0 == -1 && this.selected_fields.x0 == -1)
            {
                this.selected_fields.y0 = y;
                this.selected_fields.x0 = x;
                this.selected_field_id = "y_" + y + "_x_" + x;
            }
            else
            {
                this.selected_fields.y1 = y;
                this.selected_fields.x1 = x;
                this.table[this.selected_fields.y0][this.selected_fields.x0].selected = false;
                this.table[this.selected_fields.y1][this.selected_fields.x1].selected = false;
                swap_field = true;
                return swap_field;
            }
        }
        return swap_field;
    }

    function fillUpTable()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].type == NUL)
                {
                    this.table[i][j].type = generateRandomNumber(4)+1;
                    this.table[i][j].selected = false;
                }
            }
        }
    }

    function logTable()
    {
        let row_string="";

        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                row_string += this.table[i][j].type + " ";
            }
            console.log(row_string);
            console.log("\n");
            row_string="";
        }
        console.log("---------------------------------------\n");
    }

    function generateRandomNumber(max_number)
    {
        return Math.floor(Math.random() * max_number);
    }
}