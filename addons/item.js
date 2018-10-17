function Item(type, rank, image)
{
    this.type  = type;
    this.rank  = rank;
    this.image = image;
    this.skills = [];

    if(rank === -1) this.skills[0] = new Skill("EMPTY");
    if(rank === 0)
    {
        this.skills[0] = new Skill("Promote");
    }
    if(rank === 1)
    {
        this.skills[0] = new Skill("Shield");
        this.skills[1] = new Skill("Promote");
    }
    if(rank === 2)
    {
        this.skills[0] = new Skill("Shield");
        this.skills[1] = new Skill("Promote");
        this.skills[2] = new Skill("Shock");
    }

    /*for(let i=0; i<=rank; i++)
    {
        this.skills[i] = new Skill("Promote");
    }*/
}