console.log("ability.js loaded");

function Ability(type)
{
    this.type = type;
    this.selected = false;
    this.mana_cost = 0;

    switch(type)
    {
        case KNIGHT_MOVE:
        {
            this.mana_cost = 5;
            break;
        }
    }
}