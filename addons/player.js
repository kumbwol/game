console.log("player.js loaded");

function Player(name)
{
    this.name = name;
    this.hp = 3;
    this.max_hp = 10;
    this.ap = 0;
    this.max_ap = 0;

    let skills = [];
    skills[0] = new Skill("Shock");
    skills[1] = new Skill("Spiritarrow");
    skills[2] = new Skill("Shield");
    skills[3] = new Skill("Shadowform");
    /*skills[0] = new Skill("Shock");
    skills[1] = new Skill("Stab");
    skills[2] = new Skill("Shield");
    skills[3] = new Skill("Spiritarrow");
    skills[4] = new Skill("Shieldslam");
    skills[5] = new Skill("Shadowform");*/

    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}