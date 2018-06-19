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
            effect.dmg = 5;
            break;
        }

        case "Transform":
        {
            effect.type = TRANSFORM;
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
    }


    this.getSkillEffect = getSkillEffect;

    function getSkillEffect()
    {
        return effect;
    }

}