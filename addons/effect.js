console.log("effect.js loaded");

function Effect(name)
{
    this.name = name;

    let effect =
     {
         self: false,
         transform: false,
         stun: false,
         stun_amount: 0,
         poison_amount: 0,
         poison_dmg: 0,
         dmg: 0,
         chance_type: "",
         heal: 0,
         type_primary: -1,
         type_secondary: -1
     };


    switch(this.name)
    {
        case "DMG0":
        {
            effect.type_primary = DMG;
            effect.type_secondary = NOTHING;
            effect.dmg = 5;
            break;
        }

        case "DMG":
        {
            effect.type_primary = DMG;
            effect.type_secondary = NOTHING;
            effect.dmg = 15;
            break;
        }

        case "DMG2":
        {
            effect.type_primary = DMG;
            effect.type_secondary = NOTHING;
            effect.dmg = 20;
            break;
        }

        case "DMG1":
        {
            effect.type_primary = DMG;
            effect.type_secondary = NOTHING;
            effect.dmg = 10;
            break;
        }

        case "Transform":
        {
            effect.type_primary = SHADOWFORM;
            effect.type_secondary = NOTHING;
            effect.transform = true;
            break;
        }

        case "Heal":
        {
            effect.type_primary = HEAL;
            effect.type_secondary = NOTHING;
            effect.self = true;
            effect.heal = 5;
            break;
        }

        case "Regeneration":
        {
            effect.type_primary = HEAL;
            effect.type_secondary = NOTHING;
            effect.self = true;
            effect.heal = 10;
            break;
        }

        case "Stun":
        {
            effect.type_primary = STUN;
            effect.type_secondary = NOTHING;
            effect.stun = true;
            effect.stun_amount = 5;
            break;
        }

        case "Poison":
        {
            effect.type_primary = POISON;
            effect.poison_amount = 5;
            effect.type_secondary = POISON_DMG;
            effect.poison_dmg = 3;
            effect.transform = true;
            break;
        }

        case "Freeze":
        {
            effect.type_primary = FREEZE;
            effect.type_secondary = NOTHING;
            break;
        }
    }


    this.getSkillEffect = getSkillEffect;

    function getSkillEffect()
    {
        return effect;
    }

}