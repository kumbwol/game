console.log("enemy.js loaded");

function Enemy(name)
{
    this.name = name;
    this.hp;
    this.max_hp;

    let skills = [];

    if(this.name === "Skeleton")
    {
        this.max_hp = 100;
        this.hp = this.max_hp;

        skills[0] = new Skill("Raging storm");
        skills[1] = new Skill("Regeneration");
        skills[2] = new Skill("Punch");
    }

    if(this.name === "Test")
    {
        this.max_hp = 100;
        this.hp = this.max_hp;

        skills[0] = new Skill("Freeze");
        skills[1] = new Skill("Stun");
        skills[2] = new Skill("Poison");
    }


    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}