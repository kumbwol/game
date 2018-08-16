console.log("player.js loaded");

function Player(name)
{
    this.name = name;
    this.hp = 50;
    this.max_hp = 50;
    this.mp = 20;
    this.max_mp = 40;
    this.ap = 2;
    this.max_ap = 2;

    this.abilities = [];

    this.abilities[0] = new Ability(KNIGHT_MOVE);
    this.abilities[1] = new Ability(NO_ABILITY);
    this.abilities[2] = new Ability(NO_ABILITY);
    this.abilities[3] = new Ability(NO_ABILITY);
    this.abilities[4] = new Ability(NO_ABILITY);
    this.abilities[5] = new Ability(NO_ABILITY);

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
    skills[2] = [];
    skills[3] = [];

    skills[0][0] = new Skill("Shock");
    skills[0][1] = new Skill("Loss");
    skills[0][2] = new Skill("Shield");
    skills[0][3] = new Skill("Spiritarrow");
    skills[1][0] = new Skill("Loss");
    skills[1][1] = new Skill("Shock");
    skills[2][0] = new Skill("Shock");
    skills[3][0] = new Skill("Loss");
    skills[3][1] = new Skill("Shock");

    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}