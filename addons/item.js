function Item(type = RANDOM_ITEM, rank, image)
{
    this.type  = type;
    this.rank  = rank;
    this.image = image;
    this.skills = [];

    if(rank === FIRST_WEAPON)
    {
        this.skills[0] = new Skill("FIRST_WEAPON");
        this.rank = 0;
    }
    else if(rank === FIRST_SHIELD)
    {
        this.skills[0] = new Skill("FIRST_SHIELD");
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
                if(this.rank === 0)
                {
                    this.image = ITEM_HELM_LVL_1;
                }
                break;
            }

            case C_NECKLACE:
            {
                if(this.rank === 0)
                {
                    this.image = ITEM_NECKLACE_LVL_1;
                }
                break;
            }

            case C_TORSO:
            {
                if(this.rank === 0)
                {
                    this.image = ITEM_ARMOR_LVL_1;
                }
                break;
            }

            case C_RIGHT_HAND:
            {
                if(this.rank === 0)
                {
                    this.image = ITEM_SWORD_LVL_1;
                }
                break;
            }

            case C_LEFT_HAND:
            {
                if(this.rank === 0)
                {
                    this.image = ITEM_SHIELD_LVL_1;
                }
                break;
            }

            case C_BOOTS:
            {
                if(this.rank === 0)
                {
                    this.image = ITEM_BOOTS_LVL_1;
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

    function decideRandomItemType()
    {
        let random = Math.floor(Math.random() * 6);
        console.log(random);
        switch (random)
        {
            case 0: return C_HEAD;
            case 1: return C_NECKLACE;
            case 2: return C_TORSO;
            case 3: return C_LEFT_HAND;
            case 4: return C_RIGHT_HAND;
            case 5: return C_BOOTS;
        }
    }


    /*for(let i=0; i<=rank; i++)
    {
        this.skills[i] = new Skill("Promote");
    }*/
}
