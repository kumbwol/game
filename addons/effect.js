console.log("effect.js loaded");

function Effect(effect_type, minimum_amount = 0, maximum_amount = minimum_amount)
{
    this.name = effect_type;

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
        mana_cost: 0,
        combo_amount: 0,
        armor: 0,
        penetrate: 0,
        sacrifice: 0,
        blood_oath: 0,
        form_amount: 0
    };

    switch(this.name)
    {
        case DMG:
        {
            effect.type = DMG;
            effect.dmg = addRandomInterval(minimum_amount, maximum_amount);
            break;
        }

        case PROMOTE:
        {
            effect.type = PROMOTE;
            effect.self = true;
            break;
        }

        case ARMOR:
        {
            effect.type = ARMOR;
            effect.armor = addRandomInterval(minimum_amount, maximum_amount);
            break;
        }

        case SHADOWFORM:
        {
            effect.type = SHADOWFORM;
            effect.transform = true;
            effect.form_amount = addRandomIntervalDividableByFive(minimum_amount, maximum_amount);
            break;
        }

        case DEFENSEFORM:
        {
            effect.type = DEFENSEFORM;
            effect.transform = true;
            effect.form_amount = addRandomIntervalDividableByFive(minimum_amount, maximum_amount);
            break;
        }

        case MOVEFORM:
        {
            effect.type = MOVEFORM;
            effect.transform = true;
            effect.form_amount = addRandomIntervalDividableByFive(minimum_amount, maximum_amount);
            break;
        }

        case MAGICFORM:
        {
            effect.type = MAGICFORM;
            effect.transform = true;
            effect.form_amount = addRandomIntervalDividableByFive(minimum_amount, maximum_amount);
            break;
        }

        case JOKERFORM:
        {
            effect.type = JOKERFORM;
            effect.transform = true;
            effect.form_amount = addRandomIntervalDividableByFive(minimum_amount, maximum_amount);
            break;
        }

        case PARALYZE:
        {
            effect.type = PARALYZE;
            effect.paralyze_amount = addRandomInterval(minimum_amount, maximum_amount);
            break;
        }

        case STUN:
        {
            effect.type = STUN;
            effect.stun_amount = addRandomInterval(minimum_amount, maximum_amount);
            break;
        }

        case PENETRATE:
        {
            effect.type = PENETRATE;
            effect.penetrate = addRandomInterval(minimum_amount, maximum_amount);
            break;
        }

		case SACRIFICE:
		{
			effect.type = SACRIFICE;
			effect.sacrifice = addRandomInterval(minimum_amount, maximum_amount);
			effect.self = true;
			break;
		}

        case MANA_REGEN:
        {
            effect.type = MANA_REGEN;
            effect.mana_regen = addRandomInterval(minimum_amount, maximum_amount);
            effect.self = true;
            break;
        }

        case MANA_DRAIN:
        {
            effect.type = MANA_DRAIN;
            effect.mana_drain = addRandomInterval(minimum_amount, maximum_amount);
            effect.self = false;
            break;
        }

        case BLOOD_OATH:
        {
            effect.type = BLOOD_OATH;
            effect.blood_oath = addRandomInterval(minimum_amount, maximum_amount);
            effect.self = true;
            break;
        }

        case NOTHING:
        {
            effect.type = NOTHING;
            break;
        }

        case "BLOOD_OATH":
        {
            effect.type = BLOOD_OATH;
            effect.blood_oath = 10;
            effect.self = true;
            break;
        }

        case "SACRIFICE":
        {
            effect.type = SACRIFICE;
            effect.sacrifice = 10;
            effect.self = true;
            break;
        }

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
            effect.armor = 5;
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
            effect.mana_regen = 3;
            effect.self = true;
            break;
        }

        case "LOSS":
        {
            effect.self = true;
            effect.type = MANA_COST;
            effect.mana_cost = 5;
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
            effect.form_amount = 10;
            break;
        }

        case "DEFENSEFORM":
        {
            effect.type = DEFENSEFORM;
            effect.form_amount = 10;
            effect.transform = true;
            break;
        }

        case "MOVEFORM":
        {
            effect.type = MOVEFORM;
            effect.form_amount = 10;
            effect.transform = true;
            break;
        }

        case "MAGICFORM":
        {
            effect.type = MAGICFORM;
            effect.form_amount = 15;
            effect.transform = true;
            break;
        }

        case "JOKERFORM":
        {
            effect.type = JOKERFORM;
            effect.transform = true;
            effect.form_amount = 50;
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

        case "hardStun":
        {
            effect.type = STUN;
            effect.stun = true;
            effect.stun_amount = 10;
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

        case "hardParalyze":
        {
            effect.type = PARALYZE;
            effect.paralyze = true;
            effect.paralyze_amount = 20;
            break;
        }

        /* ....::: REAL GAME ENEMY EFFECTS :::.... */

        case "PLAYER_LVL0_MEDIUM_PENETRATE":
        {
            effect.type = PENETRATE;
            effect.penetrate = 8;
            effect.self = false;
            break;
        }

        case "PLAYER_LVL0_LOW_DMG":
        {
            effect.type = DMG;
            effect.dmg  = 6;
            effect.self = false;
            break;
        }

        case "PLAYER_LVL0_LOW_ARMOR":
        {
            effect.type = ARMOR;
            effect.armor  = 4;
            effect.self = true;
            break;
        }

        case "PLAYER_LVL0_MEDIUM_ARMOR":
        {
            effect.type = ARMOR;
            effect.armor  = 12;
            effect.self = true;
            break;
        }



        // ...::: ENEMY :::...

        case "LVL1_LOW_DMG":
        {
            effect.type = DMG;
            effect.dmg = addRandomInterval(3, 6);
            break;
        }

        case "LVL1_MEDIUM_DMG":
        {
            effect.type = DMG;
            effect.dmg = addRandomInterval(7, 9);
            break;
        }

        case "LVL1_LOW_ARMOR":
        {
            effect.type = ARMOR;
            effect.self = true;
            effect.armor = addRandomInterval(3, 5);
            break;
        }

        case "LVL1_LOW_HEAL":
        {
            effect.type = HEAL;
            effect.self = true;
            effect.heal = addRandomInterval(3, 5);
            break;
        }

        case "LVL1_HIGH_PENETRATE":
        {
            effect.type = PENETRATE;
            effect.penetrate = addRandomInterval(10, 12);
            effect.self = false;
            break;
        }

        case "LVL2_MEDIUM_PARALYZE":
        {
            effect.type = PARALYZE;
            effect.paralyze_amount = addRandomInterval(15, 20);
            effect.self = true;
            break;
        }

        case "LVL2_LOW_DMG":
        {
            effect.type = DMG;
            effect.dmg = addRandomInterval(4, 8);
            effect.self = false;
            break;
        }

        case "LVL2_MEDIUM_ARMOR":
        {
            effect.type = ARMOR;
            effect.armor = addRandomInterval(7,10);
            effect.self = true;
            break;
        }

        case "LVL2_MEDIUM_DMG":
        {
            effect.type = DMG;
            effect.dmg = addRandomInterval(10, 12);
            effect.self = false;
            break;
        }

        case "LVL2_HIGH_PENETRATE":
        {
            effect.type = PENETRATE;
            effect.penetrate = addRandomInterval(11, 13);
            effect.self = false;
            break;
        }

        case "LVL2_LOW_STUN":
        {
            effect.type = STUN;
            effect.stun_amount = addRandomInterval(4, 6);
            effect.self = true;
            break;
        }

        case "LVL3_MEDIUM_STUN":
        {
            effect.type = STUN;
            effect.stun_amount = addRandomInterval(13, 16);
            effect.self = true;
            break;
        }

        case "LVL3_LOW_PENETRATE":
        {
            effect.type = PENETRATE;
            effect.penetrate = addRandomInterval(7, 9);
            effect.self = false;
            break;
        }

        case "LVL3_LOW_PARALYZE":
        {
            effect.type = PARALYZE;
            effect.paralyze_amount = addRandomInterval(9, 14);
            effect.self = true;
            break;
        }

        case "LVL3_HIGH_PARALYZE":
        {
            effect.type = PARALYZE;
            effect.paralyze_amount = addRandomInterval(25, 30);
            effect.self = true;
            break;
        }

        case "LVL3_LOW_DMG":
        {
            effect.type = DMG;
            effect.dmg = addRandomInterval(5, 7);
            effect.self = false;
            break;
        }

        case "LVL3_LOW_ARMOR":
        {
            effect.type = ARMOR;
            effect.armor = addRandomInterval(6,9);
            effect.self = true;
            break;
        }

        case "LVL3_MEDIUM_ARMOR":
        {
            effect.type = ARMOR;
            effect.armor = addRandomInterval(10,14);
            effect.self = true;
            break;
        }

        case "LVL3_HIGH_MANADRAIN":
        {
            effect.type = MANA_DRAIN;
            effect.mana_drain = addRandomInterval(5, 7);
            effect.self = false;
            break;
        }

        case "LVL_1_DMG":
        {
            effect.type = MANA_DRAIN;
            effect.mana_drain = addRandomInterval(5, 7);
            effect.self = false;
            break;
        }
    }

    function addRandomInterval(minimum, maximum)
    {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    function addRandomIntervalDividableByFive(minimum, maximum)
    {
        return Math.floor(Math.random() * (((maximum - minimum) / 5) + 1)) * 5 + minimum;
    }


    this.getSkillEffect = getSkillEffect;

    function getSkillEffect()
    {
        return effect;
    }
}
