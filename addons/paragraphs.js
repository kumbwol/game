console.log("paragraphs.js loaded");

this.paragraphs =
    {
        chance:
            {
                titles: [],
                paragraphs: []
            },
        effect:
            {
                titles: [],
                paragraphs: []
            },
        field:
            {
                titles: [],
                paragraphs: []
            },
        ability:
            {
                titles: [],
                paragraphs: []
            }
    };


//     ...::: ENEMY CHANCES :::...
this.paragraphs.chance.titles[LUCK] = "Luck";
this.paragraphs.chance.titles[RAGE] = "Rage";
this.paragraphs.chance.paragraphs[LUCK] = "Konstans szerencse.";
this.paragraphs.chance.paragraphs[RAGE] = "Hianyzo HP alapjan no az esely.";

//     ...::: SKILL EFFECTS :::...
this.paragraphs.effect.titles[DMG] = "Damage";
this.paragraphs.effect.titles[HEAL] = "Heal";
this.paragraphs.effect.titles[SHADOWFORM] = "Shadowform";
this.paragraphs.effect.titles[POISON] = "Poison";
this.paragraphs.effect.titles[POISON_DMG] = "Poison damage";
this.paragraphs.effect.titles[STUN] = "Stun";
this.paragraphs.effect.titles[FREEZE] = "Freeze";
this.paragraphs.effect.titles[MANA_REGEN] = "Mana regeneration";
this.paragraphs.effect.titles[MANA_DRAIN] = "Mana drain";
this.paragraphs.effect.titles[PARALYZE] = "Paralyze";
this.paragraphs.effect.titles[PROMOTE] = "Promote";
this.paragraphs.effect.titles[COMBO] = "Combo";
this.paragraphs.effect.titles[ARMOR] = "Armor";

this.paragraphs.effect.paragraphs[DMG] = "Elvesz X eletpontot az ellenfeltol.";
this.paragraphs.effect.paragraphs[HEAL] = "Visszatolt X eletpontot a hasznalojanak.";
//this.paragraphs.effect.paragraphs[SHADOWFORM] = "A <div class='text_move'></div> es <div class='text_defence'></div> mezok 75% esellyel <div class='text_attack'></div>-a alakulnak.";
//this.paragraphs.effect.paragraphs[SHADOWFORM] = "A <span style=\"color:forestgreen\">MOVE</span> es <span style=\"color:bisque\">DEFENSE</span> mezok 75% esellyel <span style=\"color:crimson\">ATTACK</span>-a alakulnak.";
this.paragraphs.effect.paragraphs[SHADOWFORM] = "A MOVE es DEFENSE mezok 75% esellyel ATTACK-a alakulnak.";
this.paragraphs.effect.paragraphs[POISON] = "X db. mezot meregge alakit at.";
this.paragraphs.effect.paragraphs[POISON_DMG] = "A mereg mezok a kor vegen X-et sebeznek.";
this.paragraphs.effect.paragraphs[STUN] = "X db. mezot elsotetit, melyeket nem tudod mozgatni, sem aktivizalni.";
this.paragraphs.effect.paragraphs[FREEZE] = "A kor vegeig meg fagy a tabla, ami miatt nem esnek le a mezok.";
this.paragraphs.effect.paragraphs[MANA_REGEN] = "Visszatolt X manapontot a hasznalojanak.";
this.paragraphs.effect.paragraphs[MANA_DRAIN] = "Elvesz X manapontot az ellenfeltol.";
this.paragraphs.effect.paragraphs[PARALYZE] = "X db. mezot elsotetit, melyeket nem tudod mozgatni, de aktivizalni tudod.";
this.paragraphs.effect.paragraphs[PROMOTE] = "Az aktivizalt mezokre eso uj mezok felfejlodnek.";
this.paragraphs.effect.paragraphs[COMBO] = "Noveli a kombo szintet, ami minnel magassab, annal erosebb effektet tartalmaz.";
this.paragraphs.effect.paragraphs[ARMOR] = "Ad X db. vedelmet, a kovetkezo korod kezdeten elveszik.";

//     ...::: FIELD TYPES :::...
this.paragraphs.field.titles[MAN] = "Magic";
this.paragraphs.field.titles[ATT] = "Attack";
this.paragraphs.field.titles[DEF] = "Defense";
this.paragraphs.field.titles[MOV] = "Move";
this.paragraphs.field.titles[POI] = "Poioson";
this.paragraphs.field.titles[PMA] = "Magic+";
this.paragraphs.field.titles[PAT] = "Attack+";
this.paragraphs.field.titles[PDE] = "Defense+";
this.paragraphs.field.titles[PMO] = "Move+";
this.paragraphs.field.paragraphs["paralyzed"] = "Status: paralyzed" + "<br>" + "Activation: Yes" + "<br>" + "Moving: NO";
this.paragraphs.field.paragraphs["stunned"]   = "Status: stunned"   + "<br>" + "Activation: NO"  + "<br>" + "Moving: NO";
this.paragraphs.field.paragraphs["normal"]    = "Status: normal"    + "<br>" + "Activation: YES" + "<br>" + "Moving: YES";


//     ...::: ABILITY TYPES :::...
this.paragraphs.ability.titles[NO_ABILITY]          = "No ability";
this.paragraphs.ability.titles[KNIGHT_MOVE]         = "Knight move";
this.paragraphs.ability.titles[DIAGONAL_MOVE]       = "Diagonal move";
this.paragraphs.ability.titles[ROTATE_LEFT]         = "Left rotation";
this.paragraphs.ability.titles[ROTATE_RIGHT]        = "Right rotation";
this.paragraphs.ability.titles[MIRROR_HORIZONTALLY] = "Mirror horizontally";
this.paragraphs.ability.titles[MIRROR_VERTICALLY]   = "Mirror vertically";
this.paragraphs.ability.titles[MAGIC_TO_MOVE]       = "Magic to move";
this.paragraphs.ability.titles[DEFENSE_TO_ATTACK]   = "Defense to attack";
this.paragraphs.ability.paragraphs[NO_ABILITY]          = "No ability";
this.paragraphs.ability.paragraphs[KNIGHT_MOVE]         = "Swaps fields in an L shape";
this.paragraphs.ability.paragraphs[DIAGONAL_MOVE]       = "Swaps fields diagonally in rane of 1 and 2";
this.paragraphs.ability.paragraphs[ROTATE_LEFT]         = "Rotates the chosen skills pattern left with 90º";
this.paragraphs.ability.paragraphs[ROTATE_RIGHT]        = "Rotates the chosen skills pattern right with 90º";
this.paragraphs.ability.paragraphs[MIRROR_HORIZONTALLY] = "Mirrors the chosen skills pattern horizontally";
this.paragraphs.ability.paragraphs[MIRROR_VERTICALLY]   = "Mirrors the chosen skills pattern vertically";
this.paragraphs.ability.paragraphs[MAGIC_TO_MOVE]       = "Changes every MAGIC field in the chosen skills pattern to MOVE";
this.paragraphs.ability.paragraphs[DEFENSE_TO_ATTACK]   = "Changes every DEFENSE field in the chosen skills pattern to ATTACK";