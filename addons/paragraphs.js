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
this.paragraphs.chance.titles[SPELL] = "Spell";
this.paragraphs.chance.titles[BALANCE] = "Balance";
this.paragraphs.chance.titles[STUCK] = "Stuck";
this.paragraphs.chance.titles[DEVELOP] = "Develop";
this.paragraphs.chance.titles[WEAKNESS] = "Weakness";
this.paragraphs.chance.paragraphs[LUCK] = "Konstans szerencse.";
this.paragraphs.chance.paragraphs[RAGE] = "Hiányzó HP alapján nő az esély.";
this.paragraphs.chance.paragraphs[SPELL] = "A másodlagos képesség manna költségétől függően teljesülhet, vagy sem.";
this.paragraphs.chance.paragraphs[BALANCE] = "Minnél több ellenfél skill teljesült az előző körben, annál kevesebb lesz az eselye. Minnél kevesebb skill teljesült, annál több lesz az esélye.";
this.paragraphs.chance.paragraphs[STUCK] = "Minden paralizált mező növli az esélyét, kb. 1.5%-kal.";
this.paragraphs.chance.paragraphs[DEVELOP] = "Minnél magasabb a játékos itemjeinek az aktuális rankja, annál nagyobb.";
this.paragraphs.chance.paragraphs[WEAKNESS] = "Minnél több fajta skillt játszik ki a játékos, annál alacsonyabb.";

//     ...::: SKILL EFFECTS :::...
this.paragraphs.effect.titles[DMG] = "Damage";
this.paragraphs.effect.titles[HEAL] = "Heal";
this.paragraphs.effect.titles[SHADOWFORM] = "Attackform";
this.paragraphs.effect.titles[POISON] = "Poison";
this.paragraphs.effect.titles[POISON_DMG] = "Poison damage";
this.paragraphs.effect.titles[STUN] = "Stun";
this.paragraphs.effect.titles[FREEZE] = "Freeze";
this.paragraphs.effect.titles[MANA_REGEN] = "Mana regeneration";
this.paragraphs.effect.titles[MANA_DRAIN] = "Mana drain";
this.paragraphs.effect.titles[MANA_COST] = "Mana cost";
this.paragraphs.effect.titles[PARALYZE] = "Paralyze";
this.paragraphs.effect.titles[PROMOTE] = "Promote";
this.paragraphs.effect.titles[COMBO] = "Combo";
this.paragraphs.effect.titles[ARMOR] = "Armor";
this.paragraphs.effect.titles[PENETRATE] = "Penetrating damage";
this.paragraphs.effect.titles[SACRIFICE] = "Sacrifice";
this.paragraphs.effect.titles[BLOOD_OATH] = "Blood oath";
this.paragraphs.effect.titles[DEFENSEFORM] = "Defenseform";
this.paragraphs.effect.titles[MOVEFORM] = "Moveform";
this.paragraphs.effect.titles[MAGICFORM] = "Magicform";
this.paragraphs.effect.titles[JOKERFORM] = "Jokerform";

this.paragraphs.effect.paragraphs[DMG] = "X sebzést okoz az ellenfélnek.";
this.paragraphs.effect.paragraphs[HEAL] = "Visszatölt X életpontot a használójának.";
//this.paragraphs.effect.paragraphs[SHADOWFORM] = "A <div class='text_move'></div> es <div class='text_defence'></div> mezok 75% esellyel <div class='text_attack'></div>-a alakulnak.";
//this.paragraphs.effect.paragraphs[SHADOWFORM] = "A <span style=\"color:forestgreen\">MOVE</span> es <span style=\"color:bisque\">DEFENSE</span> mezok 75% esellyel <span style=\"color:crimson\">ATTACK</span>-a alakulnak.";
this.paragraphs.effect.paragraphs[SHADOWFORM] = "A MOVE es DEFENSE mezők X% eséllyel ATTACK-á alakulnak.";
this.paragraphs.effect.paragraphs[POISON] = "X db. mezőt méregge alakít át.";
this.paragraphs.effect.paragraphs[POISON_DMG] = "A méreg mezők a kör végén X-szel sebzik a játékost";
this.paragraphs.effect.paragraphs[STUN] = "X db. mezőt elsötétít, melyeket nem tudod mozgatni, sem aktivizálni.";
this.paragraphs.effect.paragraphs[FREEZE] = "A kör végéig megfagy a tábla, ami miatt nem esnek le a mezők.";
this.paragraphs.effect.paragraphs[MANA_REGEN] = "Visszatölt X manapontot a használójának.";
this.paragraphs.effect.paragraphs[MANA_DRAIN] = "Elvesz X manapontot az ellenféltől.";
this.paragraphs.effect.paragraphs[MANA_COST] = "Elvesz X manapontot.";
this.paragraphs.effect.paragraphs[PARALYZE] = "X db. mezőt elhalványít, melyeket nem tudod mozgatni, de aktivizálni tudod.";
this.paragraphs.effect.paragraphs[PROMOTE] = "Az aktivizált mezőkre eső új mezők felfejlődnek. Ha egy aktiválásnál minden mező fejlesztett, az első számú skill megkétszereződik.";
this.paragraphs.effect.paragraphs[COMBO] = "Noveli a kombo szintet, ami minnel magassab, annal erosebb effektet tartalmaz.";
this.paragraphs.effect.paragraphs[ARMOR] = "Ad X db. védelmet a felhasználójának, a felhasználó új köre kezdetén megfeleződik.";
this.paragraphs.effect.paragraphs[PENETRATE] = "Elvesz X életpontot az ellenféltől, az armorét figyelmen kívűl hagyva.";
this.paragraphs.effect.paragraphs[SACRIFICE] = "X sebzést okoz a használójának.";
this.paragraphs.effect.paragraphs[BLOOD_OATH] = "Elvesz X életpontot a használójától, az armorát figyelmen kívűl hagyva.";
this.paragraphs.effect.paragraphs[DEFENSEFORM] = "A MAGIC és ATTACK mezők X% eséllyel DEFENSE-é alakulnak.";
this.paragraphs.effect.paragraphs[MOVEFORM] = "A DEFENSE és MAGIC mezők X% eséllyel MOVE-á alakulnak.";
this.paragraphs.effect.paragraphs[MAGICFORM] = "Az ATTACK és MOVE mezők X% eséllyel MAGIC-é alakulnak.";
this.paragraphs.effect.paragraphs[JOKERFORM] = "A mezők X% eséllyel JOKER-é alakulnak.";

//     ...::: FIELD TYPES :::...
this.paragraphs.field.titles[MAN] = "Magic";
this.paragraphs.field.titles[ATT] = "Attack";
this.paragraphs.field.titles[DEF] = "Defense";
this.paragraphs.field.titles[MOV] = "Move";
this.paragraphs.field.titles[POI] = "Poison";
this.paragraphs.field.titles[PMA] = "Magic+";
this.paragraphs.field.titles[PAT] = "Attack+";
this.paragraphs.field.titles[PDE] = "Defense+";
this.paragraphs.field.titles[PMO] = "Move+";
this.paragraphs.field.titles[JOK] = "Joker+";
this.paragraphs.field.titles[PJO] = "Joker+";
this.paragraphs.field.paragraphs["paralyzed"] = "Státusz: paralizált" + "<br>" + "Aktivizálható: igen" + "<br>" + "Mozgatható: nem";
this.paragraphs.field.paragraphs["stunned"]   = "Státusz: stunnolt"   + "<br>" + "Aktivizálható: nem"  + "<br>" + "Mozgatható: nem";
this.paragraphs.field.paragraphs["normal"]    = "Státusz: normál"    + "<br>" + "Aktivizálható: igen" + "<br>" + "Mozgatható: igen";


//     ...::: ABILITY TYPES :::...
this.paragraphs.ability.titles[NO_ABILITY]          = "No ability";
this.paragraphs.ability.titles[KNIGHT_MOVE]         = "Ló lépés (3)";
this.paragraphs.ability.titles[DIAGONAL_MOVE]       = "Átlós lépés (3)";
this.paragraphs.ability.titles[ROTATE_LEFT]         = "Balra forgatás (6)";
this.paragraphs.ability.titles[ROTATE_RIGHT]        = "Jobbra forgatás (6)";
this.paragraphs.ability.titles[MIRROR_HORIZONTALLY] = "Vízszintes tükrözés (6)";
this.paragraphs.ability.titles[MIRROR_VERTICALLY]   = "Függőleges tükrözés (6)";
this.paragraphs.ability.titles[MAGIC_TO_MOVE]       = "Magic to move";
this.paragraphs.ability.titles[DEFENSE_TO_ATTACK]   = "Defense to attack";
this.paragraphs.ability.paragraphs[NO_ABILITY]          = "No ability";
this.paragraphs.ability.paragraphs[KNIGHT_MOVE]         = "Felcserélhetsz elemeket ló lépésben.";
this.paragraphs.ability.paragraphs[DIAGONAL_MOVE]       = "Felcserélhetsz 1 és 2 távolságban átlósan elemeket.";
this.paragraphs.ability.paragraphs[ROTATE_LEFT]         = "Elforgatja a kiválasztott alakzatot 90º-kal balra.";
this.paragraphs.ability.paragraphs[ROTATE_RIGHT]        = "Elforgatja a kiválasztott alakzatot 90º-kal jobbra.";
this.paragraphs.ability.paragraphs[MIRROR_HORIZONTALLY] = "Megtükrözi a kiválasztott alakzatot vízszintesen.";
this.paragraphs.ability.paragraphs[MIRROR_VERTICALLY]   = "Megtükrözi a kiválasztott alakzatot függőlegesen.";
this.paragraphs.ability.paragraphs[MAGIC_TO_MOVE]       = "Changes every MAGIC field in the chosen skills pattern to MOVE";
this.paragraphs.ability.paragraphs[DEFENSE_TO_ATTACK]   = "Changes every DEFENSE field in the chosen skills pattern to ATTACK";
