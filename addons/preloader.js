console.log("preloader.js loaded");

let images = [
    "addons/images/move.png",
    "addons/images/attack.png",
    "addons/images/defense.png",
    "addons/images/heal.png",
    "addons/images/self.png",
    "addons/images/skeleton.png",
    "addons/images/selector.gif",
    "addons/images/success.png",
    "addons/images/failure.png",
    "addons/images/skill_effects/dmg.png",
    "addons/images/skill_effects/heal.png",
    "addons/images/chance_types/luck.png",
    "addons/images/chance_types/rage.png"
];

this.$object = [];

for(let i=0; i<images.length; i++)
{
    this.$object[i] = $("<img>").attr("src", images[i]);
}
