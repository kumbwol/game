console.log("enemy.js loaded");

function Enemy(name)
{
    this.name = name;
    this.hp;
    this.max_hp;

    if(this.name == "Skeleton")
    {
        this.max_hp = 100;
        this.hp = this.max_hp;
    }
}