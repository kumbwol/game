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
                    [DEF,JOK,JOK],
                    [JOK,JOK,JOK],
                    [JOK,JOK,JOK]
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
                    [ATT,NUL,NUL],
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

        case "Defenseform":
        {
            visual_pattern =
                [
                    [DEF,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL],
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("DEFENSEFORM");
            secondary_effect = new Effect("NOTHING");
            break;
        }

        case "Moveform":
        {
            visual_pattern =
                [
                    [MOV,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL],
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("MOVEFORM");
            secondary_effect = new Effect("NOTHING");
            break;
        }

        case "Magicform":
        {
            visual_pattern =
                [
                    [MAN,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL],
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("MAGICFORM");
            secondary_effect = new Effect("NOTHING");
            break;
        }

        case "Jokerform":
        {
            visual_pattern =
                [
                    [JOK,NUL,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL],
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("JOKERFORM");
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

        case "sacrifice":
        {
            primary_effect = new Effect("SACRIFICE");
            secondary_effect = new Effect("SACRIFICE");
            chance = new Chance(LUCK, 100);
            this.nameText = "Pókháló";
            break;
        }

        case "blood_oath":
        {
            primary_effect = new Effect("BLOOD_OATH");
            secondary_effect = new Effect("BLOOD_OATH");
            chance = new Chance(LUCK, 100);
            this.nameText = "Pókháló";
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
                    [DEF,DEF,NUL],
                    [NUL,NUL,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("PLAYER_LVL0_MEDIUM_PENETRATE");
            //primary_effect  = new Effect("armor");
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
                    [DEF,NUL,DEF],
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
                    [NUL,NUL,NUL],
                    [NUL,JOK,NUL],
                    [NUL,NUL,NUL]
                ];*/
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("PLAYER_LVL0_MEDIUM_ARMOR");
            secondary_effect = new Effect("NOTHING");
            this.nameText = "Védés";
            break;
        }

        case "FIRST_ARMOR1":
        {
            /*visual_pattern =
                [
                    [MOV,DEF,NUL],
                    [DEF,MOV,NUL],
                    [MOV,NUL,NUL]
                ];*/
            visual_pattern =
                [
                    [NUL,JOK,NUL],
                    [NUL,JOK,NUL],
                    [NUL,NUL,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("PLAYER_LVL0_MEDIUM_ARMOR");
            secondary_effect = new Effect("NOTHING");
            this.nameText = "Védés1";
            break;
        }

        case "FIRST_ARMOR2":
        {
            /*visual_pattern =
                [
                    [MOV,DEF,NUL],
                    [DEF,MOV,NUL],
                    [MOV,NUL,NUL]
                ];*/
            visual_pattern =
                [
                    [NUL,JOK,NUL],
                    [NUL,JOK,NUL],
                    [NUL,SJO,NUL]
                ];
            pattern = new SkillPattern(visual_pattern);
            primary_effect  = new Effect("PLAYER_LVL0_MEDIUM_ARMOR");
            secondary_effect = new Effect("NOTHING");
            this.nameText = "Védés2";
            break;
        }

        case "MACE_LVL3_UTES":
        {
            visual_pattern =
                [
                    [ATT,ATT,NUL],
                    [ATT,ATT,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 33);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DMG, 7, 9);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Ütés";
            break;
        }

        case "MACE_LVL3_SUHINTAS":
        {
            visual_pattern =
                [
                    [MAN,ATT,MAN],
                    [ATT,MAN,ATT],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DMG, 11, 14);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Suhintás";
            break;
        }

        case "MACE_LVL3_POFON":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [MOV,MOV,ATT],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DMG, 3, 4);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Pofon";
            break;
        }

        case "MACE_LVL3_BIZTOSFOGAS":
        {
            visual_pattern =
                [
                    [NUL,DEF,NUL],
                    [ATT,NUL,ATT],
                    [NUL,DEF,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 20);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(PROMOTE);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Biztos fogás";
            break;
        }

        case "MACE_LVL3_CSAPAS":
        {
            visual_pattern =
                [
                    [NUL,ATT,ATT],
                    [MAN,NUL,ATT],
                    [MAN,MAN,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(NOTHING);
            secondary_effect = new Effect(DMG, 10, 18);
            this.nameText = "Csapás";
            break;
        }

        case "MACE_LVL3_VERES":
        {
            visual_pattern =
                [
                    [ATT,NUL,NUL],
                    [ATT,NUL,ATT],
                    [ATT,NUL,ATT]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DMG, 6, 8);
            secondary_effect = new Effect(DMG, 4, 5);
            this.nameText = "Verés";
            break;
        }

        case "MACE_LVL3_IJESZTES":
        {
            visual_pattern =
                [
                    [NUL,MAN,NUL],
                    [MOV,DEF,MAN],
                    [NUL,MOV,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 4, 6);
            secondary_effect = new Effect(SHADOWFORM, 10);
            this.nameText = "Ijesztés";
            break;
        }

        case "MACE_LVL3_FELKESZULES":
        {
            visual_pattern =
                [
                    [DEF,MAN,NUL],
                    [MOV,ATT,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 40);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(PROMOTE);
            secondary_effect = new Effect(PARALYZE, 4, 8);
            this.nameText = "Felkészülés";
            break;
        }

        case "MACE_LVL3_SZETMORZSOLAS":
        {
            visual_pattern =
                [
                    [JOK,NUL,JOK],
                    [NUL,JOK,NUL],
                    [JOK,NUL,JOK]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(NOTHING);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Szétmorzsolás";
            break;
        }

        case "MACE_LVL3_MEREVSEG":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [DEF,DEF,DEF],
                    [DEF,MOV,DEF]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 18, 22);
            secondary_effect = new Effect(STUN, 3, 4);
            this.nameText = "Merevség";
            break;
        }

        case "SWORD_LVL3_VAGAS":
        {
            visual_pattern =
                [
                    [ATT,ATT,NUL],
                    [NUL,NUL,ATT],
                    [NUL,NUL,ATT]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DMG, 7, 8);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Vágás";
            break;
        }

        case "SWORD_LVL3_SZURAS":
        {
			visual_pattern =
				[
					[NUL,NUL,DEF],
					[ATT,ATT,ATT],
					[NUL,NUL,DEF]
				];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(PENETRATE, 5, 6);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Szúrás";
            break;
        }

        case "SWORD_LVL3_VEDES":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [NUL,DEF,NUL],
                    [ATT,DEF,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 3);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Védés";
            break;
        }

        case "SWORD_LVL3_HARITAS":
        {
            visual_pattern =
                [
                    [DEF,NUL,NUL],
                    [ATT,DEF,NUL],
                    [NUL,ATT,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 5, 7);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Hárítás";
            break;
        }

		case "SWORD_LVL3_DOFES":
		{
			visual_pattern =
				[
					[NUL,ATT,NUL],
					[ATT,MAN,ATT],
					[NUL,ATT,NUL]
				];

			pattern = new SkillPattern(visual_pattern);

			addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

			pattern = new SkillPattern(visual_pattern);

			primary_effect  = new Effect(PENETRATE, 9, 11);
			secondary_effect = new Effect(PARALYZE, 4, 7);
			this.nameText = "Döfés";
			break;
		}

		case "SWORD_LVL3_VIVAS":
		{
			visual_pattern =
				[
					[DEF,ATT,NUL],
					[ATT,DEF,NUL],
					[DEF,ATT,NUL]
				];

			pattern = new SkillPattern(visual_pattern);

			addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

			pattern = new SkillPattern(visual_pattern);

			primary_effect  = new Effect(DMG, 6, 8);
			secondary_effect = new Effect(ARMOR, 6, 8);
			this.nameText = "Vívás";
			break;
		}

		case "SWORD_LVL3_HASITAS":
		{
			visual_pattern =
				[
					[MAN,NUL,MAN],
					[NUL,ATT,NUL],
					[MAN,NUL,MAN]
				];

			pattern = new SkillPattern(visual_pattern);

			addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

			pattern = new SkillPattern(visual_pattern);

			primary_effect  = new Effect(PENETRATE, 6, 8);
			secondary_effect = new Effect(NOTHING);
			this.nameText = "Hasítás";
			break;
		}

		case "SWORD_LVL3_PARBAJ":
		{
			visual_pattern =
				[
					[ATT,NUL,ATT],
					[ATT,NUL,ATT],
					[ATT,NUL,ATT]
				];

			pattern = new SkillPattern(visual_pattern);

			addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 100);

			pattern = new SkillPattern(visual_pattern);

			primary_effect  = new Effect(DMG, 10, 14);
			secondary_effect = new Effect(PROMOTE);
			this.nameText = "Párbaj";
			break;
		}

        case "SWORD_LVL3_TISZTELGES":
        {
            visual_pattern =
                [
                    [NUL,DEF,NUL],
                    [NUL,MOV,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 80);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(PROMOTE);
            secondary_effect = new Effect(STUN, 1, 2);
            this.nameText = "Tisztelgés";
            break;
        }

        case "SWORD_LVL3_HATRALAS":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [MOV,NUL,NUL],
                    [MOV,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 20);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(SACRIFICE, 6, 8);
            secondary_effect = new Effect(ARMOR, 12, 14);
            this.nameText = "Hátrálás";
            break;
        }

        case "HELM_LIGHT_LVL3_VEDES":
        {
            visual_pattern =
                [
                    [DEF,NUL,DEF],
                    [NUL,NUL,NUL],
                    [NUL,MOV,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 3, 4);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Védés";
            break;
        }

        case "HELM_LIGHT_LVL3_KITERES":
        {
            visual_pattern =
                [
                    [NUL,NUL,MOV],
                    [MOV,NUL,MOV],
                    [MOV,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 3, 9);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Kitérés";
            break;
        }

        case "HELM_LIGHT_LVL3_KONCENTRACIO":
        {
            visual_pattern =
                [
                    [MAN,NUL,MAN],
                    [NUL,DEF,NUL],
                    [NUL,MOV,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 33);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(PROMOTE);
            secondary_effect = new Effect(PARALYZE, 2, 4);
            this.nameText = "Koncentráció";
            break;
        }

        case "HELM_LIGHT_LVL3_MORMOLAS":
        {
            visual_pattern =
                [
                    [MAN,NUL,MAN],
                    [NUL,MAN,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 3, 4);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Mormolás";
            break;
        }

        case "HELM_LIGHT_LVL3_ENERGIAVAMPIR":
        {
            visual_pattern =
                [
                    [ATT,ATT,ATT],
                    [MAN,NUL,MAN],
                    [MAN,NUL,MAN]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_DRAIN, 10, 11);
            secondary_effect = new Effect(MANA_REGEN, 10, 11);
            this.nameText = "Energiavámpír";
            break;
        }

        case "HELM_LIGHT_LVL3_MERENGES":
        {
            visual_pattern =
                [
                    [MAN,NUL,MAN],
                    [NUL,NUL,NUL],
                    [MAN,NUL,MAN]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 7, 9);
            secondary_effect = new Effect(PARALYZE, 7, 9);
            this.nameText = "Merengés";
            break;
        }

        case "HELM_LIGHT_LVL3_FOKUSZ":
        {
            visual_pattern =
                [
                    [MOV,DEF,MAN],
                    [DEF,NUL,MAN],
                    [MAN,MAN,MAN]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 100);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 13, 15);
            secondary_effect = new Effect(ARMOR, 8, 10);
            this.nameText = "Fókusz";
            break;
        }

        case "HELM_HEAVY_LVL3_VEDES":
        {
            visual_pattern =
                [
                    [NUL,DEF,NUL],
                    [DEF,DEF,DEF],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 5, 6);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Védés";
            break;
        }

        case "HELM_HEAVY_LVL3_KITERES":
        {
            visual_pattern =
                [
                    [DEF,DEF,NUL],
                    [MOV,MOV,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 10);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 5, 6);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Kitérés";
            break;
        }

        case "HELM_HEAVY_LVL3_MORMOLAS":
        {
            visual_pattern =
                [
                    [MAN,NUL,MAN],
                    [NUL,MAN,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 20);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 3, 4);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Mormolás";
            break;
        }

        case "HELM_HEAVY_LVL3_BLOKKOLAS":
        {
            visual_pattern =
                [
                    [DEF,DEF,DEF],
                    [DEF,NUL,DEF],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 4, 5);
            secondary_effect = new Effect(ARMOR, 4, 5);
            this.nameText = "Blokkolás";
            break;
        }

        case "HELM_HEAVY_LVL3_TEKINTELY":
        {
            visual_pattern =
                [
                    [MAN,DEF,NUL],
                    [NUL,MOV,NUL],
                    [NUL,DEF,MAN]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 50);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 10, 12);
            secondary_effect = new Effect(PROMOTE);
            this.nameText = "Tekintély";
            break;
        }

        case "HELM_HEAVY_LVL3_HARCIKIALTAS":
        {
            visual_pattern =
                [
                    [MOV,MAN,ATT],
                    [MOV,MAN,ATT],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 50);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(SHADOWFORM, 25, 30);
            secondary_effect = new Effect(PROMOTE);
            this.nameText = "Harci kiáltás";
            break;
        }

        case "ARMOR_LIGHT_LVL3_VEDES":
        {
            visual_pattern =
                [
                    [NUL,DEF,NUL],
                    [NUL,DEF,NUL],
                    [NUL,MOV,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 3, 4);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Védés";
            break;
        }

        case "ARMOR_LIGHT_LVL3_KITERES":
        {
            visual_pattern =
                [
                    [DEF,DEF,NUL],
                    [NUL,NUL,NUL],
                    [NUL,MOV,MOV]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 10);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 5, 6);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Kitérés";
            break;
        }

        case "ARMOR_LIGHT_LVL3_PIHENES":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [MAN,NUL,NUL],
                    [MOV,MOV,MOV]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 20);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 9, 11);
            secondary_effect = new Effect(STUN, 6, 8);
            this.nameText = "Pihenés";
            break;
        }

        case "ARMOR_LIGHT_LVL3_REGENERALAS":
        {
            visual_pattern =
                [
                    [MAN,MAN,MAN],
                    [MOV,NUL,MAN],
                    [MOV,MOV,MOV]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 10, 12);
            secondary_effect = new Effect(PARALYZE, 2, 3);
            this.nameText = "Regenerálás";
            break;
        }

        case "ARMOR_LIGHT_LVL3_FURGESEG":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [MOV,SJO,DEF],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 12, 14);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Fürgeség";
            break;
        }

        case "ARMOR_LIGHT_LVL3_BUKFENC":
        {
            visual_pattern =
                [
                    [JOK,JOK,JOK],
                    [JOK,NUL,JOK],
                    [JOK,MOV,JOK]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(NOTHING);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Bukfenc";
            break;
        }

        case "ARMOR_LIGHT_LVL3_TOMPITAS":
        {
            visual_pattern =
                [
                    [NUL,DEF,NUL],
                    [MOV,ATT,DEF],
                    [NUL,MOV,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 12, 13);
            secondary_effect = new Effect(PARALYZE, 3, 4);
            this.nameText = "Tompítás";
            break;
        }

        case "ARMOR_HEAVY_LVL3_VEDES":
        {
            visual_pattern =
                [
                    [NUL,NUL,DEF],
                    [NUL,NUL,DEF],
                    [NUL,MOV,MOV]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 5, 6);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Védés";
            break;
        }

        case "ARMOR_HEAVY_LVL3_KITERES":
        {
            visual_pattern =
                [
                    [MOV,NUL,NUL],
                    [NUL,DEF,DEF],
                    [NUL,MOV,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 5, 6);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Kitérés";
            break;
        }

        case "ARMOR_HEAVY_LVL3_BLOKKOLAS":
        {
            visual_pattern =
                [
                    [NUL,DEF,DEF],
                    [NUL,NUL,DEF],
                    [NUL,DEF,DEF]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 4, 5);
            secondary_effect = new Effect(ARMOR, 4, 5);
            this.nameText = "Blokkolás";
            break;
        }

        case "ARMOR_HEAVY_LVL3_MEREVSEG":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [DEF,DEF,NUL],
                    [MOV,DEF,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 7, 9);
            secondary_effect = new Effect(STUN, 2, 3);
            this.nameText = "Merevség";
            break;
        }

        case "ARMOR_HEAVY_LVL3_KEMENYVERT":
        {
            visual_pattern =
                [
                    [DEF,NUL,DEF],
                    [DEF,DEF,DEF],
                    [DEF,NUL,DEF]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 18, 22);
            secondary_effect = new Effect(STUN, 1, 2);
            this.nameText = "Kemény vért";
            break;
        }

        case "ARMOR_HEAVY_LVL3_LOBBANEKONYSAG":
        {
            visual_pattern =
                [
                    [DEF,NUL,ATT],
                    [NUL,DEF,ATT],
                    [DEF,NUL,ATT]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 25);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DMG, 13, 15);
            secondary_effect = new Effect(SACRIFICE, 3, 5);
            this.nameText = "Lobbanékonyság";
            break;
        }

        case "SHOES_LIGHT_LVL3_TAVOLSAGTARTAS":
        {
            visual_pattern =
                [
                    [NUL,ATT,ATT],
                    [NUL,NUL,ATT],
                    [DEF,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DEFENSEFORM, 15);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Távolságtartás";
            break;
        }

        case "SHOES_LIGHT_LVL3_VANDOR":
        {
            visual_pattern =
                [
                    [NUL,NUL,MOV],
                    [NUL,MOV,MOV],
                    [MOV,MOV,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MOVEFORM, 20);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Vándor";
            break;
        }

        case "SHOES_LIGHT_LVL3_PIHENES":
        {
            visual_pattern =
                [
                    [MOV,MAN,NUL],
                    [MAN,MOV,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 5, 6);
            secondary_effect = new Effect(STUN, 2, 3);
            this.nameText = "Pihenés";
            break;
        }

        case "SHOES_LIGHT_LVL3_REGENERALAS":
        {
            visual_pattern =
                [
                    [MOV,MOV,MAN],
                    [MOV,NUL,MAN],
                    [MOV,MAN,MAN]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 50);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 10, 12);
            secondary_effect = new Effect(PARALYZE, 2, 3);
            this.nameText = "Regenerálás";
            break;
        }

        case "SHOES_LIGHT_LVL3_FURGESEG":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [NUL,SJO,NUL],
                    [MOV,NUL,DEF]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 12, 14);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Fürgeség";
            break;
        }

        case "SHOES_LIGHT_LVL3_UGRAS":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [NUL,MOV,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 66);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(NOTHING);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Ugrás";
            break;
        }

        case "SHOES_LIGHT_LVL3_OSONAS":
        {
            visual_pattern =
                [
                    [MAN,MOV,NUL],
                    [MOV,MAN,NUL],
                    [MAN,MOV,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 100);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MAGICFORM, 30, 35);
            secondary_effect = new Effect(SACRIFICE, 5, 6);
            this.nameText = "Osonás";
            break;
        }

        case "SHOES_HEAVY_LVL3_TAVOLSAGTARTAS":
        {
            visual_pattern =
                [
                    [DEF,ATT,NUL],
                    [NUL,DEF,ATT],
                    [NUL,NUL,DEF]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DEFENSEFORM, 20);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Távolságtartás";
            break;
        }

        case "SHOES_HEAVY_LVL3_VANDOR":
        {
            visual_pattern =
                [
                    [NUL,MOV,NUL],
                    [NUL,MOV,NUL],
                    [NUL,MOV,MOV]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MOVEFORM, 15);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Vándor";
            break;
        }

        case "SHOES_HEAVY_LVL3_PIHENES":
        {
            visual_pattern =
                [
                    [MOV,MAN,NUL],
                    [MAN,MOV,NUL],
                    [NUL,NUL,NUL]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(MANA_REGEN, 5, 6);
            secondary_effect = new Effect(STUN, 2, 3);
            this.nameText = "Pihenés";
            break;
        }

        case "SHOES_HEAVY_LVL3_GANCS":
        {
            visual_pattern =
                [
                    [NUL,NUL,NUL],
                    [MOV,NUL,NUL],
                    [ATT,MOV,ATT]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(DMG, 8, 9);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Gáncs";
            break;
        }

        case "SHOES_HEAVY_LVL3_STABILITAS":
        {
            visual_pattern =
                [
                    [NUL,DEF,NUL],
                    [MOV,DEF,MOV],
                    [MOV,NUL,MOV]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(ARMOR, 13, 16);
            secondary_effect = new Effect(PARALYZE, 4, 5);
            this.nameText = "Stabilitás";
            break;
        }

        case "SHOES_HEAVY_LVL3_DINAMIKA":
        {
            visual_pattern =
                [
                    [JOK,NUL,NUL],
                    [NUL,MOV,NUL],
                    [NUL,NUL,JOK]
                ];

            pattern = new SkillPattern(visual_pattern);

            addJokers(visual_pattern, pattern.getSkillPatternWidth(), pattern.getSkillPatternHeight(), 0);

            pattern = new SkillPattern(visual_pattern);

            primary_effect  = new Effect(PROMOTE);
            secondary_effect = new Effect(NOTHING);
            this.nameText = "Dinamika";
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
            chance = new Chance(STUCK  , 0);
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

    function addJokers(pattern, width, height, chance)
    {
        let can_push_right = false;
        let can_push_left  = false;
        let can_push_up    = false;
        let can_push_down  = false;

        if(width === 2)
        {
            can_push_left = true;

            for(let i=0; i<3; i++)
            {
                if(pattern[i][0] !== NUL)
                {
                    can_push_right = true;
                    can_push_left = false;
                }
            }
        }

        if(height === 2)
        {
            can_push_up = true;

            for(let i=0; i<3; i++)
            {
                if(pattern[0][i] !== NUL)
                {
                    can_push_down = true;
                    can_push_up = false;
                }
            }
        }

        let push_left_right = Math.floor(Math.random() * 2);
        let push_up_down    = Math.floor(Math.random() * 2);

        if(can_push_right)
        {
            if(push_left_right === 0) pushPatternRight(pattern);
        }
        else if(can_push_left)
        {
            if(push_left_right === 0) pushPatternLeft(pattern);
        }

        if(can_push_up)
        {
            if(push_up_down === 0) pushPatternUp(pattern);
        }
        else if(can_push_down)
        {
            if(push_up_down === 0) pushPatternDown(pattern);
        }

        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if(pattern[i][j] === NUL)
                {
                    let random = (Math.floor(Math.random() * 100)) + 1;

                    if(random < chance)
                    {
                        pattern[i][j] = JOK;
                    }
                }
            }
        }
    }

    function pushPatternRight(pattern)
    {
        for(let i=0; i<3; i++)
        {
            for(let j=1; j>=0; j--)
            {
                pattern[i][j+1] = pattern[i][j];
            }
        }

        for(let i=0; i<3; i++)
        {
            pattern[i][0] = NUL;
        }
    }

    function pushPatternDown(pattern)
    {
        for(let i=0; i<3; i++)
        {
            for(let j=1; j>=0; j--)
            {
                pattern[j+1][i] = pattern[j][i];
            }
        }

        for(let i=0; i<3; i++)
        {
            pattern[0][i] = NUL;
        }
    }

    function pushPatternLeft(pattern)
    {
        for(let i=0; i<3; i++)
        {
            for(let j=1; j<3; j++)
            {
                pattern[i][j-1] = pattern[i][j];
            }
        }

        for(let i=0; i<3; i++)
        {
            pattern[i][2] = NUL;
        }
    }

    function pushPatternUp(pattern)
    {
        for(let i=0; i<3; i++)
        {
            for(let j=1; j<3; j++)
            {
                pattern[j-1][i] = pattern[j][i];
            }
        }

        for(let i=0; i<3; i++)
        {
            pattern[2][i] = NUL;
        }
    }

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

    function createVisualPattern(visual_pattern)
    {

    }
}
