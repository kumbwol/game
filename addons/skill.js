console.log("skill.js loaded");

function Skill(name)
{
    this.name = name;
    let visual_pattern = [];
    let pattern;
    let primary_effect;
    let secondary_effect;
    let chance;
    let rank = 0;

    //this.name = (this.name).split(",")[1];
    //alert((this.name).split(",").length);
    /*if((this.name).split(",").length > 1)
    {
        this.name = (this.name).split(",")[1];
    }
    else*/ //this.name = (this.name).split(",")[rank];

    //alert((this.name).split(",").length);

    switch(this.name)
    {
        case "Shock":
        {
            visual_pattern =
                [
                    /*[DEF,NUL,NUL],
                    [NUL,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL],
                    [MAN,MOV,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("REGEN");
            secondary_effect  = new Effect("REGEN");
            break;
        }

        case "Loss":
        {
            visual_pattern =
                [/*
                    [ATT,ATT,NUL],
                    [ATT,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [DEF,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("LOSS");
            secondary_effect  = new Effect("LOSS");
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
            primary_effect   = new Effect("Heal");
            secondary_effect = new Effect("NOTHING");
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
            primary_effect  = new Effect("DMG");
            secondary_effect = new Effect("NOTHING");
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
            primary_effect  = new Effect("Transform");
            secondary_effect = new Effect("NOTHING");
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
            primary_effect  = new Effect("Poison");
            secondary_effect = new Effect("NOTHING");
            break;
        }

        case "Raging storm":
        {
            primary_effect = new Effect("DMG2");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(RAGE, 0);
            break;
        }

        case "Regeneration":
        {
            primary_effect = new Effect("Regeneration");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, 30);
            break;
        }

        case "Punch":
        {
            primary_effect = new Effect("DMG1");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "Poison":
        {
            primary_effect = new Effect("Poison");
            secondary_effect = new Effect("PoisonDMG");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "Stun":
        {
            primary_effect = new Effect("Stun");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "Freeze":
        {
            primary_effect = new Effect("Freeze");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "Double Punch":
        {
            primary_effect = new Effect("DMG0");
            secondary_effect = new Effect("DMG");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "Paralyze":
        {
            primary_effect = new Effect("PARALYZE");
            secondary_effect = new Effect("DMG");
            chance = new Chance(LUCK, 100);
            break;
        }
    }

    this.getSkillPatternHeight = getSkillPatternHeight;
    this.getSkillPatternWidth  = getSkillPatternWidth;
    this.getSkillPatternValue  = getSkillPatternValue;
    this.rotateSkillPattern    = rotateSkillPattern;
    this.resetOriginalPattern  = resetOriginalPattern;
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

    function rotateSkillPattern()
    {
        return pattern.rotateSkillPattern();
    }

    function resetOriginalPattern()
    {
        return pattern.resetOriginalPattern();
    }

    function getSkillEffect(id)
    {
        if(id === PRIMARY) return primary_effect.getSkillEffect();
        else return secondary_effect.getSkillEffect();
    }
}