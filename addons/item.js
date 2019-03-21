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
    else if(rank === 0)
    {
        this.skills[0] = new Skill("Promote");
    }
    else if(rank === 1)
    {
        //this.skills[0] = new Skill("Promote");
        this.skills[0] = new Skill("selfPara");
        this.skills[1] = new Skill("UsePromote");
    }
    else if(rank === 2)
    {
        /*this.skills[0] = new Skill("Shield");
        this.skills[1] = new Skill("Promote");*/
        if(Math.floor(Math.random() * 2))
        {
            this.skills[0] = new Skill("Promote");
            this.skills[1] = new Skill("PENETRATE");
            this.skills[2] = new Skill("PENETRATE");
        }
        else
        {
            this.skills[0] = new Skill("PENETRATE");
            this.skills[1] = new Skill("PENETRATE");
            this.skills[2] = new Skill("PENETRATE");
        }

    }

    /*for(let i=0; i<=rank; i++)
    {
        this.skills[i] = new Skill("Promote");
    }*/
}
