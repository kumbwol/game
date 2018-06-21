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
this.paragraphs.effect.paragraphs[DMG] = "Elvesz X eletpontot az ellenfeltol.";
this.paragraphs.effect.paragraphs[HEAL] = "Visszatolt X eletpontot a hasznalojanak.";
