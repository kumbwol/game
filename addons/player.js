console.log("player.js loaded");

function Player(name)
{
    this.name = name;
    this.hp = 100;
    this.max_hp = 100;

    let skills = [];
    skills[0] = new Skill("Attack");
    skills[1] = new Skill("Block");
    skills[2] = new Skill("Regen");
    skills[3] = new Skill("Heal");
    skills[4] = new Skill("Dodge");
    skills[5] = new Skill("Hook");

    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}