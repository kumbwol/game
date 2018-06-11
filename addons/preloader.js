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
    "addons/images/failure.png"
];

let $object = [];

for(let i=0; i<images.length; i++)
{
    $object[i] = $("<img>").attr("src", images[i]);
}
