console.log("preloader.js loaded");

let images = [
    "addons/images/self.png",
    "addons/images/selector.gif",
    "addons/images/success.png",
    "addons/images/failure.png",
    "addons/images/ability_types/rotate_left.png",
    "addons/images/ability_types/rotate_right.png",
    "addons/images/ability_types/mirror_vertically.png",
    "addons/images/ability_types/mirror_horizontally.png",
    "addons/images/ability_types/knight_move.png",
    "addons/images/ability_types/diagonal_move.png",
    "addons/images/ability_types/no_ability.png",
    "addons/images/ability_types/magic_to_move.png",
    "addons/images/ability_types/defense_to_attack.png",
    "addons/images/battle_gui/ability_selector.png",
    "addons/images/battle_gui/armor.png",
    "addons/images/battle_gui/combo.png",
    "addons/images/battle_gui/pass_button.png",
    "addons/images/battle_gui/player_ability_container.png",
    "addons/images/chance_types/balance.png",
    "addons/images/chance_types/develop.png",
    "addons/images/chance_types/luck.png",
    "addons/images/chance_types/rage.png",
    "addons/images/chance_types/spell.png",
    "addons/images/chance_types/stuck.png",
    "addons/images/chance_types/weakness.png",
    "addons/images/cursor/default.png",
    "addons/images/cursor/use_ability.png",
    "addons/images/enemy/pixi.png",
    "addons/images/enemy/skeleton.png",
    "addons/images/enemy/snake.png",
    "addons/images/enemy/spider.png",
    "addons/images/enemy/succubus.png",
    "addons/images/enemy/test.png",
    "addons/images/field_types/attack.png",
    "addons/images/field_types/defense.png",
    "addons/images/field_types/joker.png",
    "addons/images/field_types/magic.png",
    "addons/images/field_types/move.png",
    "addons/images/field_types/poison.png",
    "addons/images/field_types/promoted_attack.png",
    "addons/images/field_types/promoted_defense.png",
    "addons/images/field_types/promoted_joker.png",
    "addons/images/field_types/promoted_magic.png",
    "addons/images/field_types/promoted_move.png",
    "addons/images/inventory_gui/bootsBG.png",
    "addons/images/inventory_gui/character.png",
    "addons/images/inventory_gui/character_big.png",
    "addons/images/inventory_gui/destroy_item.png",
    "addons/images/inventory_gui/headBG.png",
    "addons/images/inventory_gui/leftHandBG.png",
    "addons/images/inventory_gui/necklaceBG.png",
    "addons/images/inventory_gui/rightHandBG.png",
    "addons/images/inventory_gui/torsoBG.png",
    "addons/images/items/lvl_1/armor.png",
    "addons/images/items/lvl_1/boots.png",
    "addons/images/items/lvl_1/helm.png",
    "addons/images/items/lvl_1/necklace.png",
    "addons/images/items/lvl_1/shield.png",
    "addons/images/items/lvl_1/sword.png",
    "addons/images/items/lvl_3/armor/heavy/armor.png",
    "addons/images/items/lvl_3/armor/light/armor.png",
    "addons/images/items/lvl_3/helmet/heavy/helmet.png",
    "addons/images/items/lvl_3/helmet/light/helmet.png",
    "addons/images/items/lvl_3/shoes/heavy/shoes.png",
    "addons/images/items/lvl_3/shoes/light/shoes.png",
    "addons/images/items/lvl_3/weapon/axe/axe.png",
    "addons/images/items/lvl_3/weapon/mace/mace.png",
    "addons/images/items/lvl_3/weapon/shield/shield.png",
    "addons/images/items/lvl_3/weapon/sword/sword.png",
    "addons/images/items/lvl_4/amulet/defensive/necklace.png",
    "addons/images/items/lvl_4/amulet/magic/necklace.png",
    "addons/images/items/lvl_4/amulet/move/necklace.png",
    "addons/images/items/lvl_4/amulet/offensive/necklace.png",
    "addons/images/items/starting_items/armor.png",
    "addons/images/items/starting_items/dagger.png",
    "addons/images/items/starting_items/shield.png",
    "addons/images/skill_effects/armor.png",
    "addons/images/skill_effects/blood_oath.png",
    "addons/images/skill_effects/combo.png",
    "addons/images/skill_effects/defenseform.png",
    "addons/images/skill_effects/dmg.png",
    "addons/images/skill_effects/freeze.png",
    "addons/images/skill_effects/heal.png",
    "addons/images/skill_effects/jokerform.png",
    "addons/images/skill_effects/magicform.png",
    "addons/images/skill_effects/mana_cost.png",
    "addons/images/skill_effects/mana_drain.png",
    "addons/images/skill_effects/moveform.png",
    "addons/images/skill_effects/paralyze.png",
    "addons/images/skill_effects/penetrate.png",
    "addons/images/skill_effects/poison.png",
    "addons/images/skill_effects/poison_dmg.png",
    "addons/images/skill_effects/promote.png",
    "addons/images/skill_effects/regen.png",
    "addons/images/skill_effects/sacrifice.png",
    "addons/images/skill_effects/shadowform.png",
    "addons/images/skill_effects/stun.png",
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
