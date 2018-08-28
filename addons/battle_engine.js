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
    this.rank = [];
    this.active_ability_id = -1;
    this.ability_used = false;

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

    this.freezed = false;

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
    this.calculateEnemySkillChances = calculateEnemySkillChances;
    this.decideEnemySkills = decideEnemySkills;
    this.stunTable = stunTable;
    this.paralyzeTable = paralyzeTable;
    this.stunField = stunField;
    this.paralyzeField = paralyzeField;
    this.isFieldStunned = isFieldStunned;
    this.isFieldParalyzed = isFieldParalyzed;
    this.isPlayerPoisoned = isPlayerPoisoned;
    this.countPoisons = countPoisons;
    this.addPoisonDMG = addPoisonDMG;
    this.activatePoisons = activatePoisons;
    this.isThereAntiVenom = isThereAntiVenom;
    this.createAntiPoisonInRow = createAntiPoisonInRow;
    this.createAntiPoisonInColumn = createAntiPoisonInColumn;
    this.clearStunnedFields = clearStunnedFields;
    this.clearParalyzedFields = clearParalyzedFields;
    this.freezePlayer = freezePlayer;
    this.isPlayerFreezed = isPlayerFreezed;
    this.stopFreeze = stopFreeze;
    this.enemyActivatePrimarySkill = enemyActivatePrimarySkill;
    this.enemyActivateSecondarySkill = enemyActivateSecondarySkill;
    this.resetRanks = resetRanks;
    this.increaseRank = increaseRank;
    this.selectAbility = selectAbility;
    this.deSelectAbility = deSelectAbility;
    this.swapAbilityUsed = swapAbilityUsed;
    this.isAbilitySelected = isAbilitySelected;
    this.isSpecialAbilitySelected = isSpecialAbilitySelected;
    this.resetSkillToOriginalPattern = resetSkillToOriginalPattern;
    this.useSpecialAbility = useSpecialAbility;
    this.promoteFields = promoteFields;
    this.isTherePromotion = isTherePromotion;
    this.clearPromotedFields = clearPromotedFields;
    this.finalizePromotions = finalizePromotions;

    function finalizePromotions()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].promoted)
                {
                    //alert(this.table[i][j].type);
                    switch(this.table[i][j].type)
                    {
                        case MAN:
                        {
                            this.temp_table[i][j].type =  PMA;
                            this.table[i][j].type =  PMA;
                            break;
                        }

                        case ATT:
                        {
                            this.temp_table[i][j].type =  PAT;
                            this.table[i][j].type =  PAT;
                            break;
                        }

                        case DEF:
                        {
                            this.temp_table[i][j].type =  PDE;
                            this.table[i][j].type =  PDE;
                            break;
                        }

                        case MOV:
                        {
                            this.temp_table[i][j].type =  PMO;
                            this.table[i][j].type =  PMO;
                            break;
                        }
                    }
                }
            }
        }
    }

    function clearPromotedFields()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                this.table[i][j].promoted = false;
            }
        }
    }

    function isTherePromotion()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].promoted) return true;
            }
        }

        return false;
    }

    function promoteFields()
    {
        //this.logTable();
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].type === NUL)
                {
                    this.table[i][j].promoted = true;
                }
            }
        }
    }

    function useSpecialAbility(player, id)
    {
        if(player.abilities[this.active_ability_id].type === ROTATE_LEFT || player.abilities[this.active_ability_id].type === ROTATE_RIGHT)
        {
            this.ability_used = true;
            return player.getSkills()[id-1][this.rank[id-1]].rotateSkillPattern(player.abilities[this.active_ability_id].type);
        }
        else if(player.abilities[this.active_ability_id].type === MIRROR_HORIZONTALLY || player.abilities[this.active_ability_id].type === MIRROR_VERTICALLY)
        {
            this.ability_used = true;
            return player.getSkills()[id-1][this.rank[id-1]].mirrorSkillPattern(player.abilities[this.active_ability_id].type);
        }
        else if(player.abilities[this.active_ability_id].type === MAGIC_TO_MOVE || player.abilities[this.active_ability_id].type === DEFENSE_TO_ATTACK)
        {
            this.ability_used = true;
            return player.getSkills()[id-1][this.rank[id-1]].transformSkillPattern(player.abilities[this.active_ability_id].type);
        }

        return false;
    }

    function resetSkillToOriginalPattern(player, id)
    {
        player.getSkills()[id-1][this.rank[id-1]].resetOriginalPattern();
    }

    function isSpecialAbilitySelected(player)
    {
        //alert('h');
        if(this.isAbilitySelected())
        {
            if(player.abilities[this.active_ability_id].type === ROTATE_LEFT || player.abilities[this.active_ability_id].type === ROTATE_RIGHT ||
               player.abilities[this.active_ability_id].type === MIRROR_HORIZONTALLY || player.abilities[this.active_ability_id].type === MIRROR_VERTICALLY ||
               player.abilities[this.active_ability_id].type === MAGIC_TO_MOVE || player.abilities[this.active_ability_id].type === DEFENSE_TO_ATTACK)
            {
                return true;
            }
            else return false;
        }
        else return false;
    }

    function isAbilitySelected()
    {
        return this.active_ability_id !== -1;
    }

    function deSelectAbility(player)
    {
        for(let i=0; i<player.abilities.length; i++)
        {
            player.abilities[i].selected = false;
        }
        this.active_ability_id = -1;
    }

    function selectAbility(player, id)
    {
        if(player.abilities[id].selected)
        {
            this.deSelectAbility(player);
            return true;
        }
        else
        {
            if(player.mp >= player.abilities[id].mana_cost)
            {
                this.deSelectAbility(player);
                player.abilities[id].selected = true;
                this.active_ability_id = id;
                return true;
            }
        }
        return false;
    }

    function increaseRank(skill_id, player)
    {
        //alert(player.getSkills()[skill_id].length);
        this.rank[skill_id]++;
        if(this.rank[skill_id] > (player.getSkills()[skill_id].length - 1)) this.rank[skill_id] = 0;
    }

    function resetRanks(skill_amount)
    {
        for(let i=0; i<skill_amount; i++)
        {
            this.rank[i] = 0;
        }
    }

    function enemyActivatePrimarySkill(skill, player, enemy, player_turn, id)
    {
        skill.primary_effect = enemy.getSkills()[id].getSkillEffect(PRIMARY);
        this.activateSkill(skill.primary_effect, player, enemy, player_turn);
    }

    function enemyActivateSecondarySkill(skill, player, enemy, player_turn, id)
    {
        skill.secondary_effect = enemy.getSkills()[id].getSkillEffect(SECONDARY);
        this.activateSkill(skill.secondary_effect, player, enemy, player_turn);
    }

    function isPlayerFreezed()
    {
        return this.freezed;
    }

    function freezePlayer()
    {
        this.freezed = true;
    }

    function stopFreeze()
    {
        this.freezed = false;
    }

    function clearStunnedFields()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].stunned === true)
                {
                    this.table[i][j].stunned = false;
                    this.temp_table[i][j].stunned = false;
                }
            }
        }
    }

    function clearParalyzedFields()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].paralyzed === true)
                {
                    this.table[i][j].paralyzed = false;
                    this.temp_table[i][j].paralyzed = false;
                }
            }
        }
    }

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

    function addPoisonDMG(dmg)
    {
        //ITT AZERT LEHET BUG!
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].poison_dmg === -1) this.table[i][j].poison_dmg = dmg;
                if(this.temp_table[i][j].poison_dmg === -1) this.temp_table[i][j].poison_dmg = dmg;
            }
        }
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

    function countPoisons()
    {
        let counter = 0;
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].type === POI)
                {
                    counter++;
                }
            }
        }

        return counter;
    }

    function activatePoisons()
    {
        let dmg = 0;
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                if(this.table[i][j].type === POI)
                {
                    dmg += this.table[i][j].poison_dmg;
                    this.table[i][j].type = NUL;
                    this.table[i][j].poison_dmg = 0;
                }
            }
        }

        return dmg;
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

    function isFieldParalyzed(x, y)
    {
        return this.table[y][x].paralyzed;
    }

    function stunField(x, y)
    {
        this.table[y][x].stunned = true;
    }

    function paralyzeField(x, y)
    {
        this.table[y][x].paralyzed = true;
    }

    function stunTable(stun_amount)
    {
        this.table_modified = false;

        let tries = 0;

        do
        {
            let y = generateRandomNumber(this.battle_table.height);
            let x = generateRandomNumber(this.battle_table.width);
            //console.log(y + " " + x);

            if(!this.table[y][x].stunned && !this.table[y][x].paralyzed)
            {
                //stunField(x, y);
                this.temp_table[y][x].stunned = true;
                this.stunField(x, y);
                stun_amount--;
            }
            tries++;
            this.table_modified = true;
            //console.log(stun_amount);
        }while(stun_amount !== 0 && tries!==5000);
    }

    function paralyzeTable(paralyze_amount)
    {
        this.table_modified = false;

        let tries = 0;

        do
        {
            let y = generateRandomNumber(this.battle_table.height);
            let x = generateRandomNumber(this.battle_table.width);
            //console.log(y + " " + x);

            if(!this.table[y][x].stunned && !this.table[y][x].paralyzed)
            {
                //stunField(x, y);
                this.temp_table[y][x].paralyzed = true;
                this.paralyzeField(x, y);
                paralyze_amount--;
            }
            tries++;
            this.table_modified = true;
            //console.log(stun_amount);
        }while(paralyze_amount !== 0 && tries!==5000);
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
                    /*alert((1 - (enemy.hp / enemy.max_hp)) * 100);
                    alert(Math.ceil((1 - (enemy.hp / enemy.max_hp))*100));*/

                    this.enemy_skill_chances[i] = Math.round((1 - (enemy.hp / enemy.max_hp))*100);
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
        if(effect.self === true)
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

            /*unit.mp -= (effect.dmg+1);

            if(unit.mp < 0)
            {
                unit.mp = 0;
            }*/


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

        if(effect.mana_regen > 0)
        {
            unit.mp += effect.mana_regen;

            if(unit.mp > unit.max_mp)
            {
                unit.mp = unit.max_mp;
            }

            this.skill_type.mana_regen = true;
        }

        if(effect.mana_drain > 0)
        {
            unit.mp -= effect.mana_drain;

            if(unit.mp < 0)
            {
                unit.mp = 0;
            }

            this.skill_type.mana_drain = true;
        }


        if(effect.transform === true)
        {
            this.transformTable(effect);
        }

        if(effect.poison_dmg > 0)
        {
            this.addPoisonDMG(effect.poison_dmg);
        }

        if(effect.stun === true)
        {
            this.stunTable(effect.stun_amount);
        }

        if(effect.paralyze === true)
        {
            this.paralyzeTable(effect.paralyze_amount);
        }

        if(effect.type === FREEZE)
        {
            this.freezePlayer();
        }

        if(effect.type === PROMOTE)
        {
            this.promoteFields();
        }
    }

    function addSkillValues(player, skill_id, skill, rank)
    {
        //alert(player.getSkills()[skill_id].name);
        for(let i=0; i<player.getSkills()[skill_id][rank].getSkillPatternHeight(); i++)
        {
            skill.table[i] = [];
            for(let j=0; j<player.getSkills()[skill_id][rank].getSkillPatternWidth(); j++)
            {
                skill.table[i][j] = player.getSkills()[skill_id][rank].getSkillPatternValue(j, i);
            }
        }
        skill.table_width  = player.getSkills()[skill_id][rank].getSkillPatternWidth();
        skill.table_height = player.getSkills()[skill_id][rank].getSkillPatternHeight();
        skill.primary_effect = player.getSkills()[skill_id][rank].getSkillEffect(PRIMARY);
        skill.secondary_effect = player.getSkills()[skill_id][rank].getSkillEffect(SECONDARY);
    }

    function canActivateSkill(skill, x, y)
    {
        //alert("beleptem");
        //this.logTable();
        if((x+skill.table_width) <= this.battle_table.width && (y+skill.table_height) <= this.battle_table.height)
        {
            for(let i=0; i<skill.table_height; i++)
            {
                for(let j=0; j<skill.table_width; j++)
                {
                    if(skill.table[i][j] !== NUL)
                    {
                        if(this.table[y+i][x+j].stunned)
                        {
                            return false;
                        }
                        else if(skill.table[i][j] !== this.table[y+i][x+j].type)
                        {
                            if(skill.table[i][j] === ATT && this.table[y+i][x+j].type !== PAT)
                            {
                                return false;
                            }
                            else if(skill.table[i][j] === MAN && this.table[y+i][x+j].type !== PMA)
                            {
                                return false;
                            }
                            else if(skill.table[i][j] === DEF && this.table[y+i][x+j].type !== PDE)
                            {
                                return false;
                            }
                            else if(skill.table[i][j] === MOV && this.table[y+i][x+j].type !== MOV)
                            {
                                return false;
                            }
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
                this.deselectField(player);
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

    function deselectField(player)
    {
        this.selectField(this.selected_fields.y0, this.selected_fields.x0, player);
    }

    function refreshTable()
    {
        for(let i=0; i<this.battle_table.height; i++)
        {
            for(let j=0; j<this.battle_table.width; j++)
            {
                this.table[i][j].type = this.temp_table[i][j].type;
                this.table[i][j].stunned = this.temp_table[i][j].stunned;
                this.table[i][j].paralyzed = this.temp_table[i][j].paralyzed;
                this.table[i][j].poison_dmg = this.temp_table[i][j].poison_dmg;
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
                this.temp_table[i][j].paralyzed = this.table[i][j].paralyzed;
                this.temp_table[i][j].poison_dmg = this.table[i][j].poison_dmg;
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
                        this.temp_table[k][i].paralyzed = this.temp_table[k-1][i].paralyzed;
                        this.temp_table[k][i].poison_dmg = this.temp_table[k-1][i].poison_dmg;
                        this.temp_table[k-1][i].type = NUL;
                        this.temp_table[k-1][i].poison_dmg = 0;
                        this.temp_table[k-1][i].stunned = false;
                        this.temp_table[k-1][i].paralyzed = false;
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

    function selectField(y, x, player)
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
            if(this.selected_fields.y0 === -1 && this.selected_fields.x0 === -1)
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
                else if(this.active_ability_id !== -1)
                {
                    if(this.swapAbilityUsed(this.selected_fields, player.abilities[this.active_ability_id].type))
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

        return false;
    }

    function swapAbilityUsed(selected_fields, active_ability_type)
    {
        switch(active_ability_type)
        {
            case KNIGHT_MOVE:
            {
                if ((parseInt(selected_fields.x0)+1 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)-2 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)+2 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)-1 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)+2 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)+1 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)+1 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)+2 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)-1 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)+2 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)-2 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)+1 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)-2 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)-1 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)-1 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)-2 === parseInt(selected_fields.y1)))
                {
                    this.ability_used = true;
                    return true;
                }

                return false;
            }

            case DIAGONAL_MOVE:
            {
                if ((parseInt(selected_fields.x0)+1 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)-1 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)+1 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)+1 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)-1 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)+1 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)-1 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)-1 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)+2 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)-2 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)+2 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)+2 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)-2 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)+2 === parseInt(selected_fields.y1)) ||
                    (parseInt(selected_fields.x0)-2 === parseInt(selected_fields.x1) && parseInt(selected_fields.y0)-2 === parseInt(selected_fields.y1)))
                {
                    this.ability_used = true;
                    return true;
                }

                return false;
            }

            default:
            {
                return false;
            }
        }
    }

    function swapFields(x0, y0, x1, y1)
    {
        let temp_type = this.table[y0][x0].type;
        let temp_poison_dmg = this.table[y0][x0].poison_dmg;
        this.table[y0][x0].type = this.table[y1][x1].type;
        this.table[y0][x0].poison_dmg = this.table[y1][x1].poison_dmg;
        this.table[y1][x1].type = temp_type;
        this.table[y1][x1].poison_dmg = temp_poison_dmg;

        temp_type = this.temp_table[y0][x0].type;
        temp_poison_dmg = this.temp_table[y0][x0].poison_dmg;
        this.temp_table[y0][x0].type = this.temp_table[y1][x1].type;
        this.temp_table[y0][x0].poison_dmg = this.temp_table[y1][x1].poison_dmg;
        this.temp_table[y1][x1].type = temp_type;
        this.temp_table[y1][x1].poison_dmg = temp_poison_dmg;
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

                if(original_field_type !== POI && original_field_type !== NUL)
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
                    else
                    {
                        cycles--;
                        this.table[random_y][random_x].poison_dmg = -1;
                    }
                }
                if(counter === 5000 ) break;
            }while(cycles !== 0);


            for(let i=0; i<this.battle_table.height; i++)
            {
                for(let j=0; j<this.battle_table.width; j++)
                {
                    this.temp_table[i][j].type = this.table[i][j].type;
                    this.temp_table[i][j].poison_dmg = this.table[i][j].poison_dmg;
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
                /*if(this.table[i][j].promoted)
                {
                    row_string += "1" + " ";
                }
                else
                {
                    row_string += "0" + " ";
                }*/
                row_string += this.table[i][j].type + " ";
                //row_string += this.table[i][j].poison_dmg + " ";
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
                if(this.temp_table[i][j].promoted)
                {
                    row_string += "1" + " ";
                }
                else
                {
                    row_string += "0" + " ";
                }
                //row_string += this.temp_table[i][j].type + " ";
                //row_string += this.temp_table[i][j].poison_dmg + " ";
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