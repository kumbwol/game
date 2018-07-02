console.log("preloader.js loaded");

let images = [
    "addons/images/field_types/move.png",
    "addons/images/field_types/attack.png",
    "addons/images/field_types/defense.png",
    "addons/images/field_types/poison.png",
    "addons/images/field_types/magic.png",
    "addons/images/self.png",
    "addons/images/skeleton.png",
    "addons/images/selector.gif",
    "addons/images/success.png",
    "addons/images/failure.png",
    "addons/images/skill_effects/dmg.png",
    "addons/images/skill_effects/heal.png",
    "addons/images/skill_effects/shadowform.png",
    "addons/images/skill_effects/poison.png",
    "addons/images/skill_effects/poison_dmg.png",
    "addons/images/chance_types/luck.png",
    "addons/images/chance_types/rage.png"
];

this.$object = [];

for(let i=0; i<images.length; i++)
{
    this.$object[i] = $("<img>").attr("src", images[i]);
}
