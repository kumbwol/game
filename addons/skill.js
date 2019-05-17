console.log("skill.js loaded");

function Skill(name)
{
    this.name = name;
    this.nameText;
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

        case "Penetrate":
        {
            primary_effect = new Effect("Penetrate");
            secondary_effect = new Effect("REGEN");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "ARMOR":
        {
            primary_effect = new Effect("armor");
            secondary_effect = new Effect("REGEN");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "PENETRATE":
        {
            visual_pattern =
                [
                    /*[DEF,NUL,NUL],
                    [NUL,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [ATT,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("Penetrate");
            secondary_effect  = new Effect("Penetrate");
            break;
        }

        case "EMPTY":
        {
            visual_pattern =
                [
                    /*[DEF,NUL,NUL],
                    [NUL,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [DEF,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("NOTHING");
            secondary_effect  = new Effect("NOTHING");
            break;
        }

        case "Armor":
        {
            visual_pattern =
                [
                    /*[DEF,NUL,NUL],
                    [NUL,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [MOV,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("armor");
            secondary_effect  = new Effect("armor");
            break;
        }

        case "Combo":
        {
            visual_pattern =
                [
                    /*[DEF,NUL,NUL],
                    [NUL,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [MOV,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("combo");
            secondary_effect  = new Effect("NOTHING");
            break;
        }

        case "Shock":
        {
            visual_pattern =
                [
                    /*[DEF,NUL,NUL],
                    [NUL,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [DEF,ATT,NUL],
                    [DEF,DEF,NUL],
                    [NUL,DEF,DEF]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("DMG");
            secondary_effect  = new Effect("DMG");
            break;
        }

        case "Promote":
        {
            visual_pattern =
                [
                    /*[DEF,NUL,NUL],
                    [NUL,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [DEF,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("promote");
            secondary_effect  = new Effect("NOTHING");
            break;
        }

        case "UsePromote":
        {
            visual_pattern =
                [
                    /*[DEF,NUL,NUL],
                    [NUL,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [PMA,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect    = new Effect("DMG");
            secondary_effect  = new Effect("NOTHING");
            break;
        }

        case "Loss":
        {
            visual_pattern =
                [/*
                    [ATT,ATT,NUL],
                    [ATT,ATT,NUL],
                    [NUL,NUL,NUL]*/
                    [PMA,NUL,NUL],
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

        case "selfPara":
        {
            visual_pattern =
                [
                    [ATT,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect = new Effect("PARALYZE");
            secondary_effect = new Effect("PARALYZE");
            break;
        }

        case "Magic chance":
        {
            primary_effect = new Effect("DMG2");
            secondary_effect = new Effect("LOSS");
            chance = new Chance(BALANCE, 0);
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
            primary_effect = new Effect("REGEN");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(SPELL, 0);
            break;
        }

        case "Punch":
        {
            primary_effect = new Effect("DMG1");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(RAGE, 0);
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
            chance = new Chance(LUCK, 20);
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

        case "hardParalyze":
        {
            primary_effect = new Effect("hardParalyze");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "hardStun":
        {
            primary_effect = new Effect("hardStun");
            secondary_effect = new Effect("DMG");
            chance = new Chance(LUCK, 100);
            break;
        }

        case "stuck":
        {
            primary_effect = new Effect("DMG");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(STUCK, 0);
            break;
        }

        case "develop":
        {
            primary_effect = new Effect("DMG");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(DEVELOP, 0);
            break;
        }

        case "weakness":
        {
            primary_effect = new Effect("DMG");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(WEAKNESS, 0);
            break;
        }

        /* ....::: REAL GAME ENEMY SKILLS :::.... */

        case "FIRST_WEAPON":
        {
            /*visual_pattern =
                [
                    [NUL,MAN,NUL],
                    [ATT,ATT,ATT],
                    [NUL,MAN,NUL]
                ];*/
            visual_pattern =
                [
                    [DEF,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("PLAYER_LVL0_MEDIUM_PENETRATE");
            //primary_effect  = new Effect("promote");
            secondary_effect = new Effect("NOTHING");
            this.nameText = "Döfés";
            break;
        }

        case "FIRST_SHIELD":
        {
            visual_pattern =
                [
                    [NUL,DEF,NUL],
                    [MOV,NUL,ATT],
                    [NUL,DEF,NUL]
                ];
            /*visual_pattern =
                [
                    [PDE,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];*/
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("PLAYER_LVL0_LOW_DMG");
            secondary_effect = new Effect("PLAYER_LVL0_LOW_ARMOR");
            this.nameText = "Pajzslökés";
            break;
        }

        case "FIRST_ARMOR":
        {
            visual_pattern =
                [
                    [MOV,DEF,NUL],
                    [DEF,MOV,NUL],
                    [MOV,NUL,NUL]
                ];
            /*visual_pattern =
                [
                    [DEF,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];*/
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("PLAYER_LVL0_MEDIUM_ARMOR");
            secondary_effect = new Effect("NOTHING");
            this.nameText = "Védés";
            break;
        }

        case "Csipes":
        {
            primary_effect = new Effect("LVL1_LOW_DMG");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, highLuck());
            this.nameText = "Csípés";
            break;
        }

        case "Karmolas":
        {
            primary_effect = new Effect("LVL1_LOW_DMG");
            secondary_effect = new Effect("LVL1_LOW_DMG");
            chance = new Chance(LUCK, highLuck());
            this.nameText = "Karmolás";
            break;
        }

        case "Bujocska":
        {
            primary_effect = new Effect("LVL1_LOW_ARMOR");
            secondary_effect = new Effect("LVL1_LOW_HEAL");
            chance = new Chance(BALANCE, 0);
            this.nameText = "Bújócska";
            break;
        }

        case "Vagas":
        {
            primary_effect = new Effect("LVL1_MEDIUM_DMG");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, mediumLuck());
            this.nameText = "Vágás";
            break;
        }

        case "Vivas":
        {
            primary_effect = new Effect("LVL1_MEDIUM_DMG");
            secondary_effect = new Effect("LVL1_LOW_ARMOR");
            chance = new Chance(LUCK, mediumLuck());
            this.nameText = "Vívás";
            break;
        }

        case "Feltamadas":
        {
            primary_effect = new Effect("LVL1_LOW_HEAL");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, highLuck());
            this.nameText = "Feltámadás";
            break;
        }

        case "Bosszu":
        {
            primary_effect = new Effect("LVL1_HIGH_PENETRATE");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(RAGE, 0);
            this.nameText = "Bosszú";
            break;
        }

        case "Pokhalo":
        {
            primary_effect = new Effect("LVL2_MEDIUM_PARALYZE");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, highLuck());
            this.nameText = "Pókháló";
            break;
        }

        case "Csaprago":
        {
            primary_effect = new Effect("LVL2_MEDIUM_DMG");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(LUCK, mediumLuck());
            this.nameText = "Csáprágó";
            break;
        }

        case "Fullank":
        {
            primary_effect = new Effect("LVL2_HIGH_PENETRATE");
            secondary_effect = new Effect("LVL2_LOW_STUN");
            chance = new Chance(STUCK, 0);
            this.nameText = "Fullánk";
            break;
        }

        case "Izeltlabak":
        {
            primary_effect = new Effect("LVL2_LOW_DMG");
            secondary_effect = new Effect("LVL2_LOW_DMG");
            chance = new Chance(WEAKNESS, 0);
            this.nameText = "Ízeltábak";
            break;
        }

        case "Kitin":
        {
            primary_effect = new Effect("LVL2_MEDIUM_ARMOR");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(RAGE, 0);
            this.nameText = "Kitinpáncél";
            break;
        }

        case "IzzoSzemek":
        {
            primary_effect = new Effect("LVL3_MEDIUM_STUN");
            secondary_effect = new Effect("LVL3_LOW_PENETRATE");
            chance = new Chance(STUCK, 0);
            this.nameText = "Izzó szemek";
            break;
        }

        case "Sikoly":
        {
            primary_effect = new Effect("LVL3_HIGH_PARALYZE");
            secondary_effect = new Effect("LVL3_LOW_DMG");
            chance = new Chance(RAGE, 0);
            this.nameText = "Sikoly";
            break;
        }

        case "Kobor":
        {
            primary_effect = new Effect("LVL3_MEDIUM_ARMOR");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(RAGE, 0);
            this.nameText = "Kőbőr";
            break;
        }

        case "Konnyezes":
        {
            primary_effect = new Effect("LVL3_LOW_DMG");
            secondary_effect = new Effect("LVL3_LOW_PENETRATE");
            chance = new Chance(BALANCE, 0);
            this.nameText = "Könnyezés";
            break;
        }

        case "Artatlansag":
        {
            primary_effect = new Effect("LVL3_LOW_ARMOR");
            secondary_effect = new Effect("LVL3_LOW_PARALYZE");
            chance = new Chance(BALANCE, 0);
            this.nameText = "Ártatlanság";
            break;
        }

        case "Csabitas":
        {
            primary_effect = new Effect("LVL3_HIGH_MANADRAIN");
            secondary_effect = new Effect("NOTHING");
            chance = new Chance(BALANCE, 0);
            this.nameText = "Csábítás";
            break;
        }
    }

    function lowLuck() // 15 - 25%
    {
        return Math.floor((Math.random() * 3)) * 5 + 15;
    }

    function mediumLuck() // 35 - 65%
    {
        return Math.floor((Math.random() * 7)) * 5 + 35;
    }

    function highLuck()
    {
        return 100-lowLuck();
    }

    this.getSkillPatternHeight = getSkillPatternHeight;
    this.getSkillPatternWidth  = getSkillPatternWidth;
    this.getSkillPatternValue  = getSkillPatternValue;
    this.getSkillPatternOriginalValue = getSkillPatternOriginalValue;
    this.rotateSkillPattern    = rotateSkillPattern;
    this.mirrorSkillPattern    = mirrorSkillPattern;
    this.transformSkillPattern = transformSkillPattern;
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

    function getSkillPatternOriginalValue(x, y)
    {
        return pattern.getSkillPatternOriginalValue(x, y);
    }

    function rotateSkillPattern(direction)
    {
        return pattern.rotateSkillPattern(direction);
    }

    function mirrorSkillPattern(type)
    {
        return pattern.mirrorSkillPattern(type);
    }

    function transformSkillPattern(type)
    {
        return pattern.transformSkillPattern(type);
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
