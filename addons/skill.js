console.log("skill.js loaded");

function Skill(name)
{
    this.name = name;
    let visual_pattern = [];
    let pattern;

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
            break;
        }
    }

    this.getSkillPatternHeight = getSkillPatternHeight;
    this.getSkillPatternWidth  = getSkillPatternWidth;
    this.getSkillPatternValue  = getSkillPatternValue;

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
}