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
    this.skill_type = {
        dmg: false,
        heal: false,
        transform: false
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
    this.stunTable = stunTable;
    this.stunField = stunField;
    this.isFieldStunned = isFieldStunned;
    this.isPlayerPoisoned = isPlayerPoisoned;
    this.activatePoisons = activatePoisons;
    this.isThereAntiVenom = isThereAntiVenom;
    this.createAntiPoisonInRow = createAntiPoisonInRow;
    this.createAntiPoisonInColumn = createAntiPoisonInColumn;

    function isThereAntiVenom()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].type === POI)
                {
                    this.createAntiPoisonInRow(i, j);
                    this.createAntiPoisonInColumn(i, j);
                }
            }
        }

        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].type === ANT)
                {
                    return true;
                }
            }
        }

        return false;
    }

    function createAntiPoisonInRow(y, x)
    {
        let number_of_poisons_left = 0;
        let number_of_poisons_right = 0;

        for(let i = x; i>=0; i--)
        {
            if(this.table[y][i].type === POI || this.table[y][i].type === ANT) number_of_poisons_left++;
            else break;
        }

        for(let i = x; i<this.battle_table.width; i++)
        {
            if(this.table[y][i].type === POI || this.table[y][i].type === ANT) number_of_poisons_right++;
            else break;
        }

        if(((number_of_poisons_left + number_of_poisons_right)-1) >= 3)
        {
            for(let i = x; i>=0; i--)
            {
                if(this.table[y][i].type === POI || this.table[y][i].type === ANT) this.table[y][i].type = ANT;
                else break;
            }

            for(let i = x; i<this.battle_table.width; i++)
            {
                if(this.table[y][i].type === POI || this.table[y][i].type === ANT) this.table[y][i].type = ANT;
                else break;
            }
        }
    }

    function createAntiPoisonInColumn(y, x)
    {
        let number_of_poisons_up = 0;
        let number_of_poisons_down = 0;

        for(let i = y; i>=0; i--)
        {
            if(this.table[i][x].type === POI || this.table[i][x].type === ANT) number_of_poisons_up++;
            else break;
        }

        for(let i = y; i<this.battle_table.height; i++)
        {
            if(this.table[i][x].type === POI || this.table[i][x].type === ANT) number_of_poisons_down++;
            else break;
        }

        if(((number_of_poisons_up + number_of_poisons_down)-1) >= 3)
        {
            for(let i = y; i>=0; i--)
            {
                if(this.table[i][x].type === POI || this.table[i][x].type === ANT) this.table[i][x].type = ANT;
                else break;
            }

            for(let i = y; i<this.battle_table.height; i++)
            {
                if(this.table[i][x].type === POI || this.table[i][x].type === ANT) this.table[i][x].type = ANT;
                else break;
            }
        }
    }

    function activatePoisons()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].type === POI) this.table[i][j].type = NUL;
            }
        }
    }

    function isPlayerPoisoned()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].type === POI) return true;
            }
        }

        return false;
    }

    function isFieldStunned(x, y)
    {
        return this.table[y][x].stunned;
    }

    function stunField(x, y)
    {
        this.table[y][x].stunned = true;
    }

    function stunTable(stun_amount)
    {
        this.table_modified = false;

        do
        {
            let y = generateRandomNumber(this.battle_table.height);
            let x = generateRandomNumber(this.battle_table.width);
            //console.log(y + " " + x);

            if(!this.table[y][x].stunned)
            {
                //stunField(x, y);
                this.temp_table[y][x].stunned = true;
                this.stunField(x, y);
                stun_amount--;
            }
            this.table_modified = true;
            //console.log(stun_amount);
        }while(stun_amount != 0);
    }

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
            //console.log(chance);
        }
    }

    function calculateEnemySkillChances(skill, enemy)
    {
        for(let i=0; i<enemy.getSkills().length; i++)
        {
            switch(enemy.getSkills()[i].getSkillChance().type)
            {
                case RAGE:
                {
                    //this.enemy_skill_chances[i] = "100";
                    this.enemy_skill_chances[i] = enemy.max_hp - enemy.hp;
                    break;
                }

                case LUCK:
                {
                    this.enemy_skill_chances[i] = enemy.getSkills()[i].getSkillChance().modifier;
                    break;
                }
            }
        }
    }

    function enemyTakesTurn(skill, player, enemy, battle_table, id)
    {
        let player_turn = false;
        skill.effect = enemy.getSkills()[id].getSkillEffect();
        this.activateSkill(skill.effect, player, enemy, player_turn);
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

    function activateSkill(effect, player, enemy, players_turn)
    {
        this.table_modified = false;
        let unit;
        if(effect.self == true)
        {

            if(players_turn)
            {
                unit = player;
            }
            else unit = enemy;
        }
        else
        {
            if(players_turn)
            {
                unit = enemy;
            }
            else unit = player;
        }

        if(effect.dmg > 0)
        {

            unit.hp -= effect.dmg;

            if(unit.hp < 0)
            {
                unit.hp = 0;
            }


            this.skill_type.dmg = true;
        }

        if(effect.heal > 0)
        {
            unit.hp += effect.heal;

            if(unit.hp > unit.max_hp)
            {
                unit.hp = unit.max_hp;
            }

            this.skill_type.heal = true;
        }


        if(effect.transform == true)
        {
            this.transformTable(effect);
        }

        if(effect.stun == true)
        {
            this.stunTable(effect.stun_amount);
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
        //alert("beleptem");
        //this.logTable();
        if((x+skill.table_width)<=this.battle_table.width && (y+skill.table_height)<=this.battle_table.height)
        {
            for(let i=0; i<skill.table_height; i++)
            {
                for(let j=0; j<skill.table_width; j++)
                {
                    if(skill.table[i][j] != NUL)
                    {
                        if(skill.table[i][j] != this.table[y+i][x+j].type)
                        {
                            /*alert(i);
                            alert(j);
                            alert(skill.table[i][j]);
                            alert(this.table[y+i][x+j].type);*/
                            return false;
                        }
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
                this.table[i][j].stunned = this.temp_table[i][j].stunned;
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
                this.temp_table[i][j].stunned = this.table[i][j].stunned;
            }
        }

        for(let i=0; i<this.battle_table.width; i++)
        {
            for(let j=0; j<this.battle_table.height; j++)
            {
                if(this.temp_table[j][i].type === NUL)
                {
                    for(let k=j; k>=1; k--)
                    {
                        this.temp_table[k][i].type = this.temp_table[k-1][i].type;
                        this.temp_table[k][i].stunned = this.temp_table[k-1][i].stunned;
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

        temp = this.temp_table[y0][x0].type;
        this.temp_table[y0][x0].type = this.temp_table[y1][x1].type;
        this.temp_table[y1][x1].type = temp;
    }

    function fillUpTable(table)
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(table[i][j].type === NUL)
                {
                    table[i][j].type = generateRandomNumber(4)+1;
                    //table[i][j].type = ATT;
                    table[i][j].selected = false;
                }
            }
        }

        /*if(table[8][8].type === ATT)
        {
            table[0][1].type = POI;
            table[1][1].type = POI;
            table[2][1].type = ATT;
            table[3][0].type = POI;
            table[3][2].type = POI;
            table[4][1].type = POI;
            table[5][1].type = POI;
            table[6][0].type = POI;
        }*/
    }

    function transformTable(effect)
    {
        this.table_modified = false;

        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                this.table[i][j].selected = false;
            }
        }

        if(effect.type === SHADOWFORM)
        {
            for(let i=0; i<this.battle_table.height; i++)
            {
                for(let j=0; j<this.battle_table.width; j++)
                {
                    let random_number = (generateRandomNumber(100) + 1);

                    if(this.temp_table[i][j].type === MOV || this.temp_table[i][j].type === DEF)
                    {
                        if(random_number > 25)
                        {
                            //console.log("att>" + random_number);
                            this.temp_table[i][j].type = ATT;
                            this.table_modified = true;
                        }
                    }
                }
            }
        }
        else if(effect.type === POISON)
        {
            let save_table = [];
            for(let i=0; i<this.battle_table.height; i++)
            {
                save_table[i] = [];
                for(let j=0; j<this.battle_table.width; j++)
                {
                    save_table[i][j] = this.table[i][j].type;
                }
            }

            let cycles = effect.poison_amount;
            let counter = 0;

            do
            {
                let random_y = (generateRandomNumber(this.battle_table.height));
                let random_x = (generateRandomNumber(this.battle_table.width));
                let original_field_type = this.table[random_y][random_x].type;


                if(original_field_type !== POI)
                {
                    this.table[random_y][random_x].type = POI;

                    if(this.isThereAntiVenom())
                    {
                        counter++;
                        this.table[random_y][random_x].type = original_field_type;

                        for(let i=0; i<this.battle_table.height; i++)
                        {
                            for(let j=0; j<this.battle_table.width; j++)
                            {
                                if(this.table[i][j].type === ANT)
                                {
                                    this.table[i][j].type = POI;
                                }
                            }
                        }
                    }
                    else cycles--;
                }
                if(counter === 5000 ) break;
            }while(cycles !== 0);


            for(let i=0; i<this.battle_table.height; i++)
            {
                for(let j=0; j<this.battle_table.width; j++)
                {
                    this.temp_table[i][j].type = this.table[i][j].type;
                    this.table[i][j].type = save_table[i][j];
                }
            }
            this.table_modified = true;
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