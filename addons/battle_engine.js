console.log("battle_engine.js loaded");

function BattleEngine(battle_table)
{
    this.battle_table = battle_table;
    this.table = [];
    this.temp_table = [];
    this.selected_fields = {
        y0: -1,
        x0: -1,
        y1: -1,
        x1: -1
    };
    this.selected_field_id = "";
    this.allow_select = true;
    this.enemy_skill_chances = [];
    this.enemy_skill_plays = [];
    this.table_modified = false;

    for(let i=0; i<this.battle_table.height; i++)
    {
        this.table[i] = [];
        this.temp_table[i] = [];
        for(let j=0; j<this.battle_table.width; j++)
        {
            this.table[i][j] = new Field(NUL);
            this.temp_table[i][j] = new Field(NUL);
        }
    }

    this.logTable = logTable;
    this.logTempTable = logTempTable;
    this.fillUpTable = fillUpTable;
    this.selectField = selectField;
    this.deleteField = deleteField;
    this.refreshTable = refreshTable;
    this.calculateNewTable = calculateNewTable;
    this.canActivateSkill = canActivateSkill;
    this.swapFields = swapFields;
    this.activateSkill = activateSkill;
    this.addSkillValue = addSkillValues;
    this.transformTable = transformTable;
    this.resetTempTable = resetTempTable;
    this.anyFieldSelected = anyFieldSelected;
    this.deselectField = deselectField;
    this.enemyTakesTurn = enemyTakesTurn;
    this.calculateEnemySkillChances = calculateEnemySkillChances;
    this.decideEnemySkills = decideEnemySkills;

    function decideEnemySkills()
    {
        for(let i=0; i<this.enemy_skill_chances.length; i++)
        {
            let chance = (generateRandomNumber(100) + 1);
            if(chance <= this.enemy_skill_chances[i])
            {
                this.enemy_skill_plays[i] = true;
            }
            else this.enemy_skill_plays[i] = false;
            console.log(chance);
        }
    }

    function calculateEnemySkillChances(skill, enemy)
    {
        for(let i=0; i<enemy.getSkills().length; i++)
        {
            switch(enemy.getSkills()[i].getSkillChanceType())
            {
                case "rage":
                {
                    //this.enemy_skill_chances[i] = "100";
                    this.enemy_skill_chances[i] = enemy.hp;
                    break;
                }

                case "magmas":
                {
                    this.enemy_skill_chances[i] = "30";
                    break;
                }

                case "nagy":
                {
                    this.enemy_skill_chances[i] = "100";
                    break;
                }
            }
        }
    }

    function enemyTakesTurn(skill, player, enemy, battle_table, id)
    {
        skill.effect = enemy.getSkills()[id].getSkillEffect();
        this.activateSkill(skill.effect, player, enemy, battle_table);
    }

    function resetTempTable()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                this.temp_table[i][j].type = this.table[i][j].type;
            }
        }
    }

    function activateSkill(effect, player, enemy, table)
    {
        if(effect.self == true)
        {
            player.hp -= effect.dmg;
        }
        else
        {
            enemy.hp -= effect.dmg;
            if(effect.transform == true)
            {
                //this.logTable();
                this.transformTable();
                //this.logTable();
            }
        }
    }

    function addSkillValues(player, skill_id, skill)
    {
        for(let i=0; i<player.getSkills()[skill_id].getSkillPatternHeight(); i++)
        {
            skill.table[i] = [];
            skill.effect = player.getSkills()[skill_id].getSkillEffect();
            for(let j=0; j<player.getSkills()[skill_id].getSkillPatternWidth(); j++)
            {
                skill.table[i][j] = player.getSkills()[skill_id].getSkillPatternValue(j, i);
            }
        }
        skill.table_width  = player.getSkills()[skill_id].getSkillPatternWidth();
        skill.table_height = player.getSkills()[skill_id].getSkillPatternHeight();
    }

    function canActivateSkill(skill, x, y)
    {
        if((x+skill.table_width)<=this.battle_table.width && (y+skill.table_height)<=this.battle_table.height)
        {
            for(let i=0; i<skill.table_height; i++)
            {
                for(let j=0; j<skill.table_width; j++)
                {
                    if(skill.table[i][j] != NUL)
                    {
                        if(skill.table[i][j] != this.table[y+i][x+j].type) return false;
                    }
                }
            }
            /*alert(this.selected_fields.y0);
            alert(this.selected_fields.x0);

            alert(this.selected_fields.y1);
            alert(this.selected_fields.x1);*/
            if(this.anyFieldSelected())
            {
                this.deselectField();
            }

            return true;
        }

        return false;
        /*for(let i=0; i<skill.table_height; i++)
        {
            for(let j=0; j<skill.table_width; j++)
            {
                if
            }
        }*/
    }

    function anyFieldSelected()
    {
        return (this.selected_fields.y0 >= 0 && this.selected_fields.x0 >= 0);
    }

    function deselectField()
    {
        this.selectField(this.selected_fields.y0, this.selected_fields.x0);
    }

    function refreshTable()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                this.table[i][j].type = this.temp_table[i][j].type;
                this.table[i][j].selected = false;
            }
        }
    }

    function calculateNewTable()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                this.temp_table[i][j].type = this.table[i][j].type;
            }
        }

        for(let i=0; i<this.battle_table.width; i++)
        {
            for(let j=0; j<this.battle_table.height; j++)
            {
                if(this.temp_table[j][i].type==NUL)
                {
                    for(let k=j; k>=1; k--)
                    {
                        this.temp_table[k][i].type = this.temp_table[k-1][i].type;
                        this.temp_table[k-1][i].type = NUL;
                    }
                }
            }
        }

        this.fillUpTable(this.temp_table);
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
                if(neighbouringField(this.selected_fields))
                {
                    this.table[this.selected_fields.y0][this.selected_fields.x0].selected = false;
                    this.table[this.selected_fields.y1][this.selected_fields.x1].selected = false;
                    swap_field = true;
                    this.swapFields(this.selected_fields.x0, this.selected_fields.y0, this.selected_fields.x1, this.selected_fields.y1);
                    return swap_field;
                }
                else
                {
                    this.selected_fields.y1 = -1;
                    this.selected_fields.x1 = -1;
                    this.table[y][x].selected = false;
                }
            }
        }
        return swap_field;
    }

    function neighbouringField(selected_fields)
    {
        this.selected_fields = selected_fields;

        if(parseInt(this.selected_fields.x0) === parseInt(selected_fields.x1))
        {
            //alert("egy oszlopban");
            if(parseInt(this.selected_fields.y0) === parseInt(this.selected_fields.y1)-1 || parseInt(this.selected_fields.y0) === parseInt(this.selected_fields.y1)+1)
            {
                return true;
            }
        }
        else if(parseInt(this.selected_fields.y0) === parseInt(selected_fields.y1))
        {
            //alert("egy sorban");
            if(parseInt(this.selected_fields.x0) === parseInt(this.selected_fields.x1)-1 || parseInt(this.selected_fields.x0) === parseInt(this.selected_fields.x1)+1)
            {
                return true;
            }
        }
    }

    function swapFields(x0, y0, x1, y1)
    {
        let temp = this.table[y0][x0].type;
        this.table[y0][x0].type = this.table[y1][x1].type;
        this.table[y1][x1].type = temp;
    }

    function fillUpTable(table)
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(table[i][j].type == NUL)
                {
                    table[i][j].type = generateRandomNumber(4)+1;
                    //table[i][j].type = ATT;
                    table[i][j].selected = false;
                }
            }
        }
    }

    function transformTable()
    {
        this.table_modified = false;
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.temp_table[i][j].type == MOV || this.temp_table[i][j].type == DEF)
                {
                    if(generateRandomNumber(3) > 1)
                    {
                        this.temp_table[i][j].type = ATT;
                        this.table_modified = true;
                    }
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

    function logTempTable()
    {
        let row_string="";

        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                row_string += this.temp_table[i][j].type + " ";
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