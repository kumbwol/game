console.log("player.js loaded");

function Player(name)
{
    this.name = name;
    this.hp = 80;
    this.max_hp = 80;
    this.mp = 12;
    this.max_mp = 24;
    this.ap = 3;
    this.max_ap = 3;
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

    this.abilities[0] = new Ability(ROTATE_LEFT);
    this.abilities[1] = new Ability(MIRROR_HORIZONTALLY);
    this.abilities[2] = new Ability(MIRROR_VERTICALLY);
    this.abilities[3] = new Ability(DIAGONAL_MOVE);
    this.abilities[4] = new Ability(KNIGHT_MOVE);
    this.abilities[5] = new Ability(ROTATE_RIGHT);

    let skills = [];

    this.items = [];
    this.wearItem = wearItem;

    function wearItem(place, item)
    {
        this.items[place] = item;
    }

    /*this.items[C_HEAD]       = new Item(C_HEAD,       NO_ITEM, ITEM_EMPTY);
    this.items[C_NECKLACE]   = new Item(C_NECKLACE,   NO_ITEM, ITEM_EMPTY);
    this.items[C_TORSO]      = new Item(C_TORSO,      FIRST_ARMOR, ITEM_ARMOR);
    this.items[C_RIGHT_HAND] = new Item(C_RIGHT_HAND, FIRST_SHIELD, ITEM_SHIELD);
    this.items[C_LEFT_HAND]  = new Item(C_LEFT_HAND,  FIRST_WEAPON, ITEM_DAGGER);
    this.items[C_BOOTS]      = new Item(C_BOOTS,      NO_ITEM, ITEM_EMPTY);*/

    this.items[C_HEAD]       = new Item(C_HEAD,       NO_ITEM, ITEM_EMPTY);
    this.items[C_NECKLACE]   = new Item(C_NECKLACE,   NO_ITEM, ITEM_EMPTY);
    this.items[C_TORSO]      = new Item(C_TORSO,      FIRST_ARMOR, ITEM_ARMOR);
    this.items[C_RIGHT_HAND] = new Item(C_RIGHT_HAND, FIRST_SHIELD, ITEM_DAGGER);
    this.items[C_LEFT_HAND]  = new Item(C_LEFT_HAND,  FIRST_WEAPON, ITEM_SHIELD);
    this.items[C_BOOTS]      = new Item(C_BOOTS,      NO_ITEM, ITEM_EMPTY);

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
        this.items[i] = new Item(parseInt(i), -1, ITEM_EMPTY);
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

    function resetRanks()
    {
        for(let i=0; i<this.rank.length; i++)
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
