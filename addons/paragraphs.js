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
        }
};


//     ...::: ENEMY CHANCES :::...
this.paragraphs.chance.titles[LUCK] = "Luck";
this.paragraphs.chance.titles[RAGE] = "Rage";
this.paragraphs.chance.paragraphs[LUCK] = "Konstans szerencs.";
this.paragraphs.chance.paragraphs[RAGE] = "Hianyzo HP alapjan no az esely.";

//     ...::: SKILL EFFECTS :::...
this.paragraphs.effect.titles[DMG] = "Damage";
this.paragraphs.effect.titles[HEAL] = "Heal";
this.paragraphs.effect.titles[SHADOWFORM] = "Shadowform";
this.paragraphs.effect.titles[POISON] = "Poison";
this.paragraphs.effect.paragraphs[DMG] = "Elvesz X eletpontot az ellenfeltol.";
this.paragraphs.effect.paragraphs[HEAL] = "Visszatolt X eletpontot a hasznalojanak.";
//this.paragraphs.effect.paragraphs[SHADOWFORM] = "A <div class='text_move'></div> es <div class='text_defence'></div> mezok 75% esellyel <div class='text_attack'></div>-a alakulnak.";
//this.paragraphs.effect.paragraphs[SHADOWFORM] = "A <span style=\"color:forestgreen\">MOVE</span> es <span style=\"color:bisque\">DEFENSE</span> mezok 75% esellyel <span style=\"color:crimson\">ATTACK</span>-a alakulnak.";
this.paragraphs.effect.paragraphs[SHADOWFORM] = "A MOVE es DEFENSE mezok 75% esellyel ATTACK-a alakulnak.";
this.paragraphs.effect.paragraphs[POISON] = "X db. mezot meregge alakit at, ami a kor vegen sebez.";
