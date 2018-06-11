console.log("enemy.js loaded");

function Enemy(name)
{
    this.name = name;
    this.hp;
    this.max_hp;

    let skills = [];

    if(this.name == "Skeleton")
    {
        this.max_hp = 100;
        this.hp = this.max_hp;

        skills[0] = new Skill("Duhos");
        skills[1] = new Skill("Vedekezes");
        skills[2] = new Skill("Valami");
    }


    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}