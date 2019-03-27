console.log("preloader.js loaded");

let images = [
    "addons/images/field_types/move.png",
    "addons/images/field_types/attack.png",
    "addons/images/field_types/defense.png",
    "addons/images/field_types/poison.png",
    "addons/images/field_types/magic.png",
    "addons/images/self.png",
    "addons/images/enemy/skeleton.png",
    "addons/images/selector.gif",
    "addons/images/success.png",
    "addons/images/failure.png",
    "addons/images/skill_effects/dmg.png",
    "addons/images/skill_effects/heal.png",
    "addons/images/skill_effects/shadowform.png",
    "addons/images/skill_effects/poison.png",
    "addons/images/skill_effects/poison_dmg.png",
    "addons/images/skill_effects/stun.png",
    "addons/images/chance_types/luck.png",
    "addons/images/chance_types/rage.png",
    "addons/images/ability_types/rotate_left.png",
    "addons/images/ability_types/rotate_right.png",
    "addons/images/ability_types/mirror_vertically.png",
    "addons/images/ability_types/mirror_horizontally.png",
    "addons/images/ability_types/knight_move.png",
    "addons/images/ability_types/diagonal_move.png",
    "addons/images/ability_types/no_ability.png",
    "addons/images/ability_types/magic_to_move.png",
    "addons/images/ability_types/defense_to_attack.png",
];

let sounds = [
    "addons/sounds/effects/freeze.mp3",
];

let fonts = [
    "myLato",
    "myFirstFont",
    "myTrajan"
];

this.$object = [];
this.$sound_object = [];

for(let i=0; i<images.length; i++)
{
    this.$object[i] = $("<img>").attr("src", images[i]);
}

for(let i=0; i<sounds.length; i++)
{
    this.$sound_object[i] = $("<audio>").attr("src", sounds[i]);
}

/*for(let i=0; i<fonts.length; i++)
{
    let string = "<div class="+ "font_preloader" + i +">Font preloader</div>";
    $("#game_background").append(string);
    $("." + "font_preloader" + i).css("font-family", fonts[i]);
}*/
