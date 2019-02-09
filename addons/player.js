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

    this.observed_rank_id  = -1;
    this.observed_skill_id = -1;

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

    this.items = [];
    this.wearItem = wearItem;

    function wearItem(place, item)
    {
        this.items[place] = item;
    }

    this.items[C_HEAD]       = new Item(C_HEAD,       NO_ITEM, EMPTY);
    this.items[C_NECKLACE]   = new Item(C_NECKLACE,   NO_ITEM, EMPTY);
    this.items[C_TORSO]      = new Item(C_TORSO,      NO_ITEM, EMPTY);
    this.items[C_LEFT_HAND]  = new Item(C_LEFT_HAND,  NO_ITEM, EMPTY);
    this.items[C_RIGHT_HAND] = new Item(C_RIGHT_HAND, NO_ITEM, EMPTY);
    this.items[C_BOOTS]      = new Item(C_BOOTS,      NO_ITEM, EMPTY);

    this.getSkills = getSkills;
    this.logItems = logItems;

    function logItems()
    {
        let s="";
        for(let i=0; i<6; i++)
        {
            s += this.items[i].image;
            s += " ";
        }
        console.log(s);
        console.log("-----------");
    }

    this.deleteItem = deleteItem;

    function deleteItem(i)
    {
        this.items[i] = new Item(i, -1, EMPTY);
    }

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

    this.resetRanks = resetRanks;

    function resetRanks(skill_amount)
    {
        for(let i=0; i<skill_amount; i++)
        {
            this.rank[i] = 0;
        }
    }

    this.skill_graphics = new SkillGraphics(this);
    this.skill_engine = new SkillEngine();
    this.skill_engine.resetSkills(this);
    this.skill_engine.updateSkills(this);

    this.inventory = new Inventory(this, this.skill_graphics);
}
