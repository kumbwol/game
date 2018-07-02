console.log("skill.js loaded");

function Skill(name)
{
    this.name = name;
    let visual_pattern = [];
    let pattern;
    let effect;
    let chance;

    switch(this.name)
    {
        case "Shock":
        {
            visual_pattern =
                [/*
                    [ATT,ATT,NUL],
                    [ATT,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [ATT,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("DMG");
            break;
        }

        case "Stab":
        {
            visual_pattern =
                [
                    [MOV,ATT,ATT],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("AGR");
            break;
        }

        case "Shield":
        {
            visual_pattern =
                [
                    [DEF,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
                /*[
                    [DEF,NUL,NUL],
                    [DEF,NUL,NUL],
                    [DEF,NUL,NUL]
                ];*/
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("Heal");
            break;
        }

        case "Spiritarrow":
        {
            visual_pattern =
                /*[
                    [ATT,ATT,NUL],
                    [ATT,MAN,NUL],
                    [NUL,NUL,MAN]
                ];*/
                [
                    [ATT,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("DMG2");
            break;
        }

        case "Shieldslam":
        {
            visual_pattern =
                [
                    [ATT,DEF,NUL],
                    [ATT,DEF,NUL],
                    [NUL,NUL,NUL],
                ];
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("AGR");
            break;
        }

        case "Shadowform":
        {
            visual_pattern =
                /*[
                    [MAN,MOV,MAN],
                    [MOV,MAN,MOV],
                    [MAN,MOV,MAN],
                ];*/
                [
                    [MAN,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL],
                ];
                /*[
                    [DEF,NUL,NUL],
                    [DEF,NUL,NUL],
                    [NUL,NUL,NUL],
                ];*/
            pattern = new SkillPattern(visual_pattern);
            effect  = new Effect("Transform");
            break;
        }

        case "Duhos":
        {
            effect = new Effect("DMG2");
            chance = new Chance(RAGE, 0);
            break;
        }

        case "Heal":
        {
            effect = new Effect("Stun");
            chance = new Chance(LUCK, 30);
            break;
        }

        case "Valami":
        {
            effect = new Effect("Poison");
            chance = new Chance(LUCK, 100);
            break;
        }
    }

    this.getSkillPatternHeight = getSkillPatternHeight;
    this.getSkillPatternWidth  = getSkillPatternWidth;
    this.getSkillPatternValue  = getSkillPatternValue;
    this.getSkillEffect = getSkillEffect;
    this.getSkillChance = getSkillChance;

    function getSkillChance()
    {
        return chance;
    }

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