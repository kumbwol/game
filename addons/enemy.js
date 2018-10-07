console.log("enemy.js loaded");

function Enemy(name)
{
    this.name = name;
    this.hp;
    this.max_hp;
    this.mp;
    this.max_mp;

    let skills = [];

    if(this.name === "Skeleton")
    {
        this.max_hp = 100;
        this.hp = this.max_hp;
        this.mp = 0;
        this.max_mp = 0;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("Raging storm");
        skills[1] = new Skill("Regeneration");
        skills[2] = new Skill("Punch");
    }

    if(this.name === "Fagyaszt")
    {
        this.max_hp = 100;
        this.hp = this.max_hp;
        this.mp = 0;
        this.max_mp = 0;

        skills[0] = new Skill("Freeze");
        skills[1] = new Skill("Stun");
        skills[2] = new Skill("Poison");
    }

    if(this.name === "Test")
    {
        this.max_hp = 100;
        this.hp = 50;
        this.max_mp = 60;
        this.mp = 44;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("ARMOR");
        skills[1] = new Skill("Paralyze");
    }

    if(this.name === "SokSkill")
    {
        this.max_hp = 100;
        this.hp = 50;
        this.max_mp = 60;
        this.mp = 60;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("Double Punch");
        skills[1] = new Skill("Paralyze");
        skills[2] = new Skill("Paralyze");
        skills[3] = new Skill("Paralyze");
        skills[4] = new Skill("Paralyze");
        skills[5] = new Skill("Paralyze");
    }

    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}