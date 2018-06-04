console.log("effect.js loaded");

function Effect(name)
{
    this.name = name;
    let dmg = 0;
    let effect =
     {
         self: false,
         dmg: 0
     };

    if(this.name == "DMG")
    {
        effect.self = false;
        effect.dmg = 25;
    }
    else if(this.name == "AGR")
    {
        effect.self = true;
        effect.dmg = 10;
    }

    this.getSkillEffect = getSkillEffect;

    function getSkillEffect()
    {
        return effect;
    }
}