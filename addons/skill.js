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
            effect  = new Effect("DMG0");
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
            effect  = new Effect("DMG");
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

        case "SelfPoison":
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
            effect  = new Effect("Poison");
            break;
        }

        case "Raging storm":
        {
            effect = new Effect("DMG2");
            chance = new Chance(RAGE, 0);
            break;
        }

        case "Regeneration":
        {
            effect = new Effect("Regeneration");
            chance = new Chance(LUCK, 30);
            break;
        }

        case "Punch":
        {
            effect = new Effect("DMG1");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "Poison":
        {
            effect = new Effect("Poison");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "Stun":
        {
            effect = new Effect("Stun");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "Freeze":
        {
            effect = new Effect("Freeze");
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