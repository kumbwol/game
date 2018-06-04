console.log("skill.js loaded");

function Skill(name)
{
    this.name = name;
    let visual_pattern = [];
    let pattern;
    let effect;

    switch(this.name)
    {
        case "Attack":
        {
            visual_pattern =
                [
                    [NUL,ATT,MAN],
                    [ATT,NUL,ATT],
                    [MAN,ATT,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("AGR");
            break;
        }

        case "Block":
        {
            visual_pattern =
                [
                    [MAN,MAN,MAN],
                    [ATT,ATT,ATT],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("AGR");
            break;
        }

        case "Regen":
        {
            visual_pattern =
                [
                    [MAN,MAN,MAN],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("AGR");
            break;
        }

        case "Heal":
        {
            visual_pattern =
                [
                    [MAN,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("DMG");
            break;
        }

        case "Dodge":
        {
            visual_pattern =
                [
                    [DEF,ATT,NUL],
                    [ATT,ATT,NUL],
                    [NUL,NUL,NUL],
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("AGR");
            break;
        }

        case "Hook":
        {
            visual_pattern =
                [
                    [ATT,ATT,NUL],
                    [ATT,NUL,NUL],
                    [MOV,NUL,NUL],
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("AGR");
            break;
        }
    }

    this.getSkillPatternHeight = getSkillPatternHeight;
    this.getSkillPatternWidth  = getSkillPatternWidth;
    this.getSkillPatternValue  = getSkillPatternValue;
    this.getSkillEffect = getSkillEffect;

    function getSkillPatternHeight()
    {
        return pattern.getSkillPatternHeight();
    }

    function getSkillPatternWidth()
    {
        return pattern.getSkillPatternWidth();
    }

    function getSkillPatternValue(x, y)
    {
        return pattern.getSkillPatternValue(x, y);
    }

    function getSkillEffect()
    {
        return effect.getSkillEffect();
    }
}