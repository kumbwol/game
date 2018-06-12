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
         chance_type: ""
     };


    switch(this.name)
    {
        case "DMG":
        {
            effect.self = false;
            effect.dmg = 25;
            break;
        }

        case "AGR":
        {
            effect.self = true;
            effect.dmg = 25;
            break;
        }

        case "Duhos":
        {
            effect.transform = true;
            effect.dmg = 25;
            break;
        }

        case "Transform":
        {
            effect.transform = true;
            effect.dmg = 25;
            break;
        }
    }


    this.getSkillEffect = getSkillEffect;

    function getSkillEffect()
    {
        return effect;
    }

}