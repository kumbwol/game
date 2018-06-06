console.log("player.js loaded");

function Player(name)
{
    this.name = name;
    this.hp = 100;
    this.max_hp = 100;

    let skills = [];
    skills[0] = new Skill("Shock");
    skills[1] = new Skill("Stab");
    skills[2] = new Skill("Shield");
    skills[3] = new Skill("Spiritarrow");
    skills[4] = new Skill("Shieldslam");
    skills[5] = new Skill("Shadowform");

    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}