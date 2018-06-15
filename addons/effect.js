console.log("effect.js loaded");

function Effect(name)
{
    this.name = name;
    let dmg = 0;

    let effect =
     {
         self: false,
         transform: false,
         dmg: 0,
         chance_type: "",
         heal: 0
     };


    switch(this.name)
    {
        case "DMG":
        {
            effect.dmg = 5;
            break;
        }

        case "DMG2":
        {
            effect.dmg = 20;
            break;
        }

        case "AGR":
        {
            effect.dmg = 10;
            break;
        }

        case "Duhos":
        {
            //effect.transform = true;
            effect.transform = false;
            effect.self = true;
            effect.dmg = 20;
            effect.heal = 0;
            break;
        }

        case "Transform":
        {
            effect.transform = true;
            break;
        }

        case "Heal":
        {
            effect.self = true;
            effect.heal = 5;
            break;
        }

        case "EnemyHeal":
        {
            effect.transform = false;
            effect.self = true;
            effect.heal = 5;
            effect.dmg = 0;
            break;
        }
    }


    this.getSkillEffect = getSkillEffect;

    function getSkillEffect()
    {
        return effect;
    }

}