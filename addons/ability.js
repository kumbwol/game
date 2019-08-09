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
            this.mana_cost = 6;
            break;
        }

        case DIAGONAL_MOVE:
        {
            this.mana_cost = 6;
            break;
        }

        case ROTATE_LEFT:
        {
            this.mana_cost = 6;
            break;
        }

        case ROTATE_RIGHT:
        {
            this.mana_cost = 6;
            break;
        }

        case MIRROR_HORIZONTALLY:
        {
            this.mana_cost = 6;
            break;
        }

        case MIRROR_VERTICALLY:
        {
            this.mana_cost = 6;
            break;
        }

        case MAGIC_TO_MOVE:
        {
            this.mana_cost = 6;
            break;
        }

        case DEFENSE_TO_ATTACK:
        {
            this.mana_cost = 6;
            break;
        }
    }
}
