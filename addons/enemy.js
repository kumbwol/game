console.log("enemy.js loaded");

function Enemy(name)
{
    this.name = name;
    this.hp;
    this.max_hp;
    this.mp;
    this.max_mp;
    this.nameText;

    let skills = [];

    if(this.name === "Pixi")
    {
        this.max_hp = 1;
        this.hp = this.max_hp;
        this.mp = 0;
        this.max_mp = 0;
        this.armor = 0;
        this.old_armor = 0;
        this.nameText = "Pixi";

        skills[0] = new Skill("Csipes");
        skills[1] = new Skill("Karmolas");
        skills[2] = new Skill("Bujocska");
    }

    if(this.name === "Skeleton")
    {
        this.max_hp = 1;
        this.hp = this.max_hp;
        this.mp = 0;
        this.max_mp = 0;
        this.armor = 0;
        this.old_armor = 0;
        this.nameText = "Csontváz";

        skills[0] = new Skill("Vagas");
        skills[1] = new Skill("Vivas");
        skills[2] = new Skill("Feltamadas");
        skills[3] = new Skill("Bosszu");
    }

    if(this.name === "Spider")
    {
        this.max_hp = 1;
        this.hp = this.max_hp;
        this.mp = 0;
        this.max_mp = 0;
        this.armor = 0;
        this.old_armor = 0;
        this.nameText = "Pók";

        skills[0] = new Skill("Pokhalo");
        skills[1] = new Skill("Csaprago");
        skills[2] = new Skill("Fullank");
        skills[3] = new Skill("Izeltlabak");
        skills[4] = new Skill("Kitin");
    }

    if(this.name === "Succubus")
    {
        this.max_hp = 1;
        this.hp = this.max_hp;
        this.mp = 0;
        this.max_mp = 0;
        this.armor = 0;
        this.old_armor = 0;
        this.nameText = "Succubus";

        skills[0] = new Skill("IzzoSzemek");
        skills[1] = new Skill("Sikoly");
        skills[2] = new Skill("Kobor");
        skills[3] = new Skill("Konnyezes");
        skills[4] = new Skill("Artatlansag");
        skills[5] = new Skill("Csabitas");
    }

    if(this.name === "Fagyaszt")
    {
        this.max_hp = 100;
        this.hp = this.max_hp;
        this.mp = 0;
        this.max_mp = 0;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("Freeze");
        skills[1] = new Skill("Stun");
        //skills[2] = new Skill("Poison");
    }

    if(this.name === "Para")
    {
        this.max_hp = 45;
        this.hp = 45;
        this.max_mp = 60;
        this.mp = 60;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("hardParalyze");
        skills[1] = new Skill("hardStun");
        skills[2] = new Skill("stuck");
        skills[3] = new Skill("Raging storm");
        //skills[4] = new Skill("Freeze");
    }

    if(this.name === "Develop")
    {
        this.max_hp = 45;
        this.hp = 45;
        this.max_mp = 60;
        this.mp = 60;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("hardParalyze");
        skills[1] = new Skill("hardStun");
        skills[2] = new Skill("develop");
        skills[3] = new Skill("Raging storm");
        //skills[4] = new Skill("Freeze");
    }

    if(this.name === "Weakness")
    {
        this.max_hp = 5;
        this.hp = 5;
        this.max_mp = 60;
        this.mp = 60;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("hardParalyze");
        skills[1] = new Skill("hardStun");
        skills[2] = new Skill("weakness");
        skills[3] = new Skill("Raging storm");
        //skills[4] = new Skill("Freeze");
    }

    if(this.name === "Test")
    {
        this.max_hp = 10;
        this.hp = 10;
        this.max_mp = 60;
        this.mp = 44;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("ARMOR");
        skills[1] = new Skill("Paralyze");
    }

    if(this.name === "SokSkill")
    {
        this.max_hp = 100;
        this.hp = 50;
        this.max_mp = 60;
        this.mp = 60;
        this.armor = 0;
        this.old_armor = 0;

        skills[0] = new Skill("Double Punch");
        skills[1] = new Skill("Paralyze");
        skills[2] = new Skill("Paralyze");
        skills[3] = new Skill("Paralyze");
        skills[4] = new Skill("Paralyze");
        skills[5] = new Skill("Paralyze");
    }

    this.getSkills = getSkills;

    function getSkills()
    {
        return skills;
    }
}
