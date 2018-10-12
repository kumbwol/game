console.log("player.js loaded");

function Player(name)
{
    this.name = name;
    this.hp = 50;
    this.max_hp = 50;
    this.mp = 10;
    this.max_mp = 10;
    this.ap = 2;
    this.max_ap = 2;
    this.old_armor = 0;
    this.armor = 0;

    this.rank = [];
    this.rank[0] = 0;
    this.rank[1] = 0;
    this.rank[2] = 0;
    this.rank[3] = 0;
    this.rank[4] = 0;
    this.rank[5] = 0;

    this.abilities = [];

    this.abilities[0] = new Ability(DEFENSE_TO_ATTACK);
    this.abilities[1] = new Ability(DIAGONAL_MOVE);
    this.abilities[2] = new Ability(ROTATE_LEFT);
    this.abilities[3] = new Ability(MIRROR_HORIZONTALLY);
    this.abilities[4] = new Ability(MIRROR_VERTICALLY);
    this.abilities[5] = new Ability(MAGIC_TO_MOVE);

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
    skills[4] = [];
    skills[5] = [];

    skills[0][0] = new Skill("Promote");
    skills[0][1] = new Skill("Loss");
    skills[0][2] = new Skill("Shield");
    skills[0][3] = new Skill("Spiritarrow");
    skills[1][0] = new Skill("Armor");
    skills[2][0] = new Skill("Shock");
    skills[2][1] = new Skill("Shock");
    skills[3][0] = new Skill("PENETRATE");
    skills[4][0] = new Skill("Loss");
    skills[4][1] = new Skill("Shock");
    skills[5][0] = new Skill("Combo");

    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }

    this.getAbility = getAbility;

    function getAbility(id)
    {
        return this.abilities[id].type;
    }

    this.increaseRank = increaseRank;

    function increaseRank(skill_id, player)
    {
        this.rank[skill_id]++;
        if(this.rank[skill_id] > (player.getSkills()[skill_id].length - 1)) this.rank[skill_id] = 0;
    }

    this.inventory = new Inventory(this);
}