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
         dmg: 0,
         chance_type: "",
         heal: 0,
         type: ""
     };


    switch(this.name)
    {
        case "DMG":
        {
            effect.type = DMG;
            effect.dmg = 5;
            break;
        }

        case "DMG2":
        {
            effect.type = DMG;
            effect.dmg = 20;
            break;
        }

        case "AGR":
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

        case "Stun":
        {
            effect.type = STUN;
            effect.stun = true;
            effect.stun_amount = 20;
            break;
        }

        case "Poison":
        {
            effect.type = POISON;
            effect.poison_amount = 10;
            effect.transform = true;
            break;
        }
    }


    this.getSkillEffect = getSkillEffect;

    function getSkillEffect()
    {
        return effect;
    }

}