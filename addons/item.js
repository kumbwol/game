function Item(type = RANDOM_ITEM, rank, image)
{
    this.type  = type;
    this.rank  = rank;
    this.image = image;
    this.skills = [];

    if(rank === FIRST_WEAPON)
    {
        //this.skills[0] = new Skill("FIRST_WEAPON");
        this.skills[0] = new Skill("Shadowform");
        this.skills[1] = new Skill("Magicform");
        this.skills[2] = new Skill("Defenseform");
        this.skills[3] = new Skill("Moveform");
        this.skills[4] = new Skill("Jokerform");
        this.rank = 4;
    }
    else if(rank === FIRST_SHIELD)
    {
        //this.skills[0] = new Skill("FIRST_SHIELD");
        this.skills[0] = new Skill("FIRST_WEAPON");
        this.rank = 0;
    }
    else if(rank === FIRST_ARMOR)
    {
        this.skills[0] = new Skill("FIRST_ARMOR");
        this.rank = 0;
    }
    else if(rank === -1) this.skills[0] = new Skill("EMPTY");
    else if(type === RANDOM_ITEM)
    {
        this.type = decideRandomItemType();
        this.rank = rank - 1;

        switch (this.type)
        {
            case C_HEAD:
            {
                let random = Math.floor(Math.random() * 2);

                if(random === 0) //light
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_HELM_LIGHT_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                else
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_HELM_HEAVY_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                break;
            }

            case C_NECKLACE:
            {
                if(this.rank === 2)
                {
                    this.image = ITEM_NECKLACE_LVL_1;
                }
                break;
            }

            case C_TORSO:
            {
                let random = Math.floor(Math.random() * 2);

                if(random === 0) //light
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_ARMOR_LIGHT_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                else
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_ARMOR_HEAVY_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                break;
            }

            case C_RIGHT_HAND:
            {
                let random = Math.floor(Math.random() * 4);

                if(random === 0) //axe
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_AXE_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                else if(random === 1) //sword
                {
                    if(this.rank === 2)
                    {
                        createSword(this.skills);
                    }
                }
                else if(random === 2) //shield
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_SHIELD_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                else if(random === 3) //mace
                {
                    if(this.rank === 2)
                    {
                        createMace(this.skills);
                    }
                }
                break;
            }

            case C_LEFT_HAND:
            {
                let random = Math.floor(Math.random() * 4);

                if(random === 0) //axe
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_AXE_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                else if(random === 1) //sword
                {
                    if(this.rank === 2)
                    {
                        createSword(this.skills)
                    }
                }
                else if(random === 2) //shield
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_SHIELD_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                else if(random === 3) //mace
                {
                    if(this.rank === 2)
                    {
                        createMace(this.skills);
                    }
                }
                break;
            }

            case C_BOOTS:
            {
                let random = Math.floor(Math.random() * 2);

                if(random === 0) //light
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_SHOES_LIGHT_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                else
                {
                    if(this.rank === 2)
                    {
                        this.image = ITEM_SHOES_HEAVY_LVL_3;

                        this.rank = 2;
                        this.skills[0] = new Skill("FIRST_ARMOR");
                        this.skills[1] = new Skill("FIRST_ARMOR1");
                        this.skills[2] = new Skill("FIRST_ARMOR2");
                    }
                }
                break;
            }
        }
        /*console.log("random");
        if(rank === 1)
        {
            this.rank = rank - 1;
            this.type = C_TORSO;
            console.log("itt");
            this.image = ITEM_ARMOR;
            this.skills[0] = new Skill("Promote");
        }*/
    }
    else if(type === C_RIGHT_HAND || type === C_LEFT_HAND)
    {
        if(this.image === ITEM_MACE_LVL_3)
        {
            createMace(this.skills);
        }
        else if(this.image === ITEM_SWORD_LVL_3)
        {
            createSword(this.skills);
        }
    }

    function decideRandomItemType()
    {
        let random = Math.floor(Math.random() * 6);
        console.log(random);
        switch (random)
        {
            case 0: return C_HEAD;
            //case 1: return C_NECKLACE;
            case 2: return C_TORSO;
            case 3: return C_LEFT_HAND;
            case 4: return C_RIGHT_HAND;
            case 5: return C_BOOTS;
            default: return C_BOOTS;
        }
    }

    function createMace(skills)
    {
        this.image = ITEM_MACE_LVL_3;
        let random;

        random = Math.floor(Math.random() * 4);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("MACE_LVL3_UTES");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("MACE_LVL3_SUHINTAS");
                break;
            }
            case 2:
            {
                skills[0] = new Skill("MACE_LVL3_POFON");
                break;
            }
            default:
            {
                skills[0] = new Skill("MACE_LVL3_BIZTOSFOGAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 4);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("MACE_LVL3_CSAPAS");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("MACE_LVL3_VERES");
                break;
            }
            case 2:
            {
                skills[1] = new Skill("MACE_LVL3_IJESZTES");
                break;
            }
            default:
            {
                skills[1] = new Skill("MACE_LVL3_FELKESZULES");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("MACE_LVL3_SZETMORZSOLAS");
                break;
            }
            default:
            {
                skills[2] = new Skill("MACE_LVL3_MEREVSEG");
                break;
            }
        }
    }

    function createSword(skills)
    {
        this.image = ITEM_SWORD_LVL_3;
        let random;

        random = Math.floor(Math.random() * 4);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("SWORD_LVL3_VAGAS");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("SWORD_LVL3_SZURAS");
                break;
            }
            case 2:
            {
                skills[0] = new Skill("SWORD_LVL3_VEDES");
                break;
            }
            default:
            {
                skills[0] = new Skill("SWORD_LVL3_HARITAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 3);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("SWORD_LVL3_DOFES");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("SWORD_LVL3_VIVAS");
                break;
            }
            case 2:
            {
                skills[1] = new Skill("SWORD_LVL3_HASITAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 3);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("SWORD_LVL3_PARBAJ");
                break;
            }

			case 1:
			{
				skills[2] = new Skill("SWORD_LVL3_TISZTELGES");
				break;
			}

            default:
            {
                skills[2] = new Skill("SWORD_LVL3_HATRALAS");
                break;
            }
        }
    }


    /*for(let i=0; i<=rank; i++)
    {
        this.skills[i] = new Skill("Promote");
    }*/
}
