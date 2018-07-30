console.log("player.js loaded");

function Player(name)
{
    this.name = name;
    this.hp = 50;
    this.max_hp = 50;
    this.mp = 20;
    this.max_mp = 40;
    this.ap = 1;
    this.max_ap = 1;

    let skills = [];
    /*skills[0] = new Skill("Shock");
    skills[1] = new Skill("Spiritarrow");
    skills[2] = new Skill("Shield");
    skills[3] = new Skill("Shadowform");*/
    /*skills[0] = new Skill("Shadowform");
    skills[1] = new Skill("Shield");
    skills[2] = new Skill("Spiritarrow");*/
    /*skills[1] = new Skill("Stab");
    skills[2] = new Skill("Shield");
    skills[3] = new Skill("Spiritarrow");
    skills[4] = new Skill("Shieldslam");
    skills[5] = new Skill("Shadowform");*/

    skills[0] = [];
    skills[1] = [];

    skills[0][0] = new Skill("Shock");
    skills[0][1] = new Skill("Loss");
    skills[1][0] = new Skill("Loss");
    skills[1][1] = new Skill("Shock");

    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}