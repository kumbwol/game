console.log("effect.js loaded");

function Effect(name)
{
    this.name = name;

    let effect =
    {
        self: false,
        transform: false,
        stun: false,
        paralyze: false,
        stun_amount: 0,
        paralyze_amount: 0,
        poison_amount: 0,
        poison_dmg: 0,
        dmg: 0,
        chance_type: "",
        heal: 0,
        type: -1,
        mana_regen: 0,
        mana_drain: 0,
        combo_amount: 0,
        armor: 0,
        penetrate: 0,
    };


    switch(this.name)
    {
        case "Penetrate":
        {
            effect.type = PENETRATE;
            effect.penetrate = 10;
            effect.self = false;
            break;
        }

        case "armor":
        {
            effect.type = ARMOR;
            effect.armor = 10;
            effect.self = true;
            break;
        }

        case "combo":
        {
            effect.type = COMBO;
            effect.combo_amount = 1;
            effect.self = true;
            break;
        }

        case "promote":
        {
            effect.type = PROMOTE;
            effect.self = true;
            break;
        }

        case "REGEN":
        {
            effect.type = MANA_REGEN;
            effect.mana_regen = 5;
            effect.self = true;
            break;
        }

        case "LOSS":
        {
            effect.type = MANA_DRAIN;
            effect.mana_drain = 5;
            break;
        }

        case "NOTHING":
        {
            effect.type = NOTHING;
            break;
        }

        case "DMG0":
        {
            effect.type = DMG;
            effect.dmg = 5;
            break;
        }

        case "DMG":
        {
            effect.type = DMG;
            effect.dmg = 15;
            break;
        }

        case "DMG2":
        {
            effect.type = DMG;
            effect.dmg = 20;
            break;
        }

        case "DMG1":
        {
            effect.type = DMG;
            effect.dmg = 10;
            break;
        }

        case "Transform":
        {
            effect.type = SHADOWFORM;
            effect.transform = true;
            break;
        }

        case "Heal":
        {
            effect.type = HEAL;
            effect.self = true;
            effect.heal = 5;
            break;
        }

        case "Regeneration":
        {
            effect.type = HEAL;
            effect.self = true;
            effect.heal = 10;
            break;
        }

        case "Stun":
        {
            effect.type = STUN;
            effect.stun = true;
            effect.stun_amount = 5;
            break;
        }

        case "Poison":
        {
            effect.type = POISON;
            effect.poison_amount = 5;
            effect.transform = true;
            break;
        }

        case "PoisonDMG":
        {
            effect.type = POISON_DMG;
            effect.poison_dmg = 5;
            effect.transform = true;
            break;
        }

        case "PoisonDMGLOW":
        {
            effect.type = POISON_DMG;
            effect.poison_dmg = 1;
            effect.transform = true;
            break;
        }

        case "Freeze":
        {
            effect.type = FREEZE;
            break;
        }

        case "PARALYZE":
        {
            effect.type = PARALYZE;
            effect.paralyze = true;
            effect.paralyze_amount = 5;
            break;
        }
    }


    this.getSkillEffect = getSkillEffect;

    function getSkillEffect()
    {
        return effect;
    }

}