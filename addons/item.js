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
                        createHelmLight(this.skills);
                    }
                }
                else
                {
                    if(this.rank === 2)
                    {
                        createHelmHeavy(this.skills);
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
                        createArmorLight(this.skills);
                    }
                }
                else
                {
                    if(this.rank === 2)
                    {
                        createArmorHeavy(this.skills);
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
                        createAxe(this.skills);
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
                        createSword(this.skills)
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
                        createAxe(this.skills);
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
                        createShield(this.skills);
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
                        createShoesLight(this.skills);
                    }
                }
                else
                {
                    if(this.rank === 2)
                    {
                        createShoesHeavy(this.skills);
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
        else if(this.image === ITEM_HELM_LIGHT_LVL_3)
        {
            createHelmLight(this.skills);
        }
        else if(this.image === ITEM_HELM_HEAVY_LVL_3)
        {
            createHelmHeavy(this.skills);
        }
        else if(this.image === ITEM_ARMOR_LIGHT_LVL_3)
        {
            createArmorLight(this.skills);
        }
        else if(this.image === ITEM_ARMOR_HEAVY_LVL_3)
        {
            createArmorHeavy(this.skills);
        }
        else if(this.image === ITEM_SHOES_LIGHT_LVL_3)
        {
            createShoesLight(this.skills);
        }
        else if(this.image === ITEM_SHOES_HEAVY_LVL_3)
        {
            createShoesHeavy(this.skills);
        }
        else if(this.image === ITEM_AXE_LVL_3)
        {
            createAxe(this.skills);
        }
        else if(this.image === ITEM_SHIELD_LVL_3)
        {
            createShield(this.skills);
        }
        else if(this.image === ITEM_NECKLACE_OFFENSIVE_LVL_4)
        {
            createNecklaceOffensive(this.skills);
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

    function createNecklaceOffensive(skills)
    {
        let random;

        random = Math.floor(Math.random() * 1);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("NECKLACE_OFFENSIVE_LVL3_BALVANY");
                break;
            }
        }

        random = Math.floor(Math.random() * 3);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("NECKLACE_OFFENSIVE_LVL3_TEKINTELY");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("NECKLACE_OFFENSIVE_LVL3_FEGYELEM");
                break;
            }
            case 2:
            {
                skills[1] = new Skill("NECKLACE_OFFENSIVE_LVL3_SAMANIZMUS");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("NECKLACE_OFFENSIVE_LVL3_MORAL");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("NECKLACE_OFFENSIVE_LVL3_LOBBANEKONYSAG");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[3] = new Skill("NECKLACE_OFFENSIVE_LVL3_ORJONGES");
                break;
            }
            case 1:
            {
                skills[3] = new Skill("NECKLACE_OFFENSIVE_LVL3_IMA");
                break;
            }
        }
    }

    function createShield(skills)
    {
        let random;

        random = Math.floor(Math.random() * 4);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("SHIELD_LVL3_VEDES");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("SHIELD_LVL3_PAJZSLOKES");
                break;
            }
            case 2:
            {
                skills[0] = new Skill("SHIELD_LVL3_HARITAS");
                break;
            }
            case 3:
            {
                skills[0] = new Skill("SHIELD_LVL3_BIZTOSFOGAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 3);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("SHIELD_LVL3_BLOKKOLAS");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("SHIELD_LVL3_REGENERALAS");
                break;
            }
            case 2:
            {
                skills[1] = new Skill("SHIELD_LVL3_ENERGIAPAJZS");
                break;
            }
        }

        random = Math.floor(Math.random() * 3);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("SHIELD_LVL3_TOMPITAS");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("SHIELD_LVL3_MEREVSEG");
                break;
            }
            case 2:
            {
                skills[2] = new Skill("SHIELD_LVL3_BECSULET");
                break;
            }
        }
    }

    function createAxe(skills)
    {
        let random;

        random = Math.floor(Math.random() * 1);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("AXE_LVL3_VAGAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 4);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("AXE_LVL3_HASITAS");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("AXE_LVL3_IJESZTES");
                break;
            }
            case 2:
            {
                skills[1] = new Skill("AXE_LVL3_BOROTVAEL");
                break;
            }
            case 3:
            {
                skills[1] = new Skill("AXE_LVL3_HASOGATAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 5);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("AXE_LVL3_AGRESSZIO");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("AXE_LVL3_SZEMETSZEMERT");
                break;
            }
            case 2:
            {
                skills[2] = new Skill("AXE_LVL3_SZABADITAS");
                break;
            }
            case 3:
            {
                skills[2] = new Skill("AXE_LVL3_SZETTEPES");
                break;
            }
            case 4:
            {
                skills[2] = new Skill("AXE_LVL3_APRITAS");
                break;
            }
        }
    }

    function createShoesLight(skills)
    {
        let random;

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("SHOES_LIGHT_LVL3_TAVOLSAGTARTAS");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("SHOES_LIGHT_LVL3_VANDOR");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("SHOES_LIGHT_LVL3_REGENERALAS");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("SHOES_LIGHT_LVL3_PIHENES");
                break;
            }
        }

        random = Math.floor(Math.random() * 3);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("SHOES_LIGHT_LVL3_FURGESEG");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("SHOES_LIGHT_LVL3_UGRAS");
                break;
            }
            case 2:
            {
                skills[2] = new Skill("SHOES_LIGHT_LVL3_OSONAS");
                break;
            }
        }
    }

    function createShoesHeavy(skills)
    {
        let random;

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("SHOES_HEAVY_LVL3_TAVOLSAGTARTAS");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("SHOES_HEAVY_LVL3_VANDOR");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("SHOES_HEAVY_LVL3_PIHENES");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("SHOES_HEAVY_LVL3_GANCS");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("SHOES_HEAVY_LVL3_STABILITAS");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("SHOES_HEAVY_LVL3_DINAMIKA");
                break;
            }
        }
    }

    function createArmorLight(skills)
    {
        let random;

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("ARMOR_LIGHT_LVL3_VEDES");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("ARMOR_LIGHT_LVL3_KITERES");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("ARMOR_LIGHT_LVL3_PIHENES");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("ARMOR_LIGHT_LVL3_REGENERALAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 3);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("ARMOR_LIGHT_LVL3_FURGESEG");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("ARMOR_LIGHT_LVL3_BUKFENC");
                break;
            }
            default:
            {
                skills[2] = new Skill("ARMOR_LIGHT_LVL3_TOMPITAS");
                break;
            }
        }
    }

    function createArmorHeavy(skills)
    {
        let random;

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("ARMOR_HEAVY_LVL3_VEDES");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("ARMOR_HEAVY_LVL3_KITERES");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("ARMOR_HEAVY_LVL3_BLOKKOLAS");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("ARMOR_HEAVY_LVL3_MEREVSEG");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("ARMOR_HEAVY_LVL3_KEMENYVERT");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("ARMOR_HEAVY_LVL3_LOBBANEKONYSAG");
                break;
            }
        }
    }

    function createHelmLight(skills)
    {
        let random;

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("HELM_LIGHT_LVL3_VEDES");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("HELM_LIGHT_LVL3_KITERES");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("HELM_LIGHT_LVL3_KONCENTRACIO");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("HELM_LIGHT_LVL3_MORMOLAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 3);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("HELM_LIGHT_LVL3_ENERGIAVAMPIR");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("HELM_LIGHT_LVL3_MERENGES");
                break;
            }
            default:
            {
                skills[2] = new Skill("HELM_LIGHT_LVL3_FOKUSZ");
                break;
            }
        }
    }

    function createHelmHeavy(skills)
    {
        let random;

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[0] = new Skill("HELM_HEAVY_LVL3_VEDES");
                break;
            }
            case 1:
            {
                skills[0] = new Skill("HELM_HEAVY_LVL3_KITERES");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[1] = new Skill("HELM_HEAVY_LVL3_MORMOLAS");
                break;
            }
            case 1:
            {
                skills[1] = new Skill("HELM_HEAVY_LVL3_BLOKKOLAS");
                break;
            }
        }

        random = Math.floor(Math.random() * 2);
        switch(random)
        {
            case 0:
            {
                skills[2] = new Skill("HELM_HEAVY_LVL3_TEKINTELY");
                break;
            }
            case 1:
            {
                skills[2] = new Skill("HELM_HEAVY_LVL3_HARCIKIALTAS");
                break;
            }
        }
    }

    function createMace(skills)
    {
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
