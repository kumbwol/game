function SkillEngine()
{
    this.updateSkills = updateSkills;
    this.resetSkills = resetSkills;


    function updateSkills(player)
    {
        for(let i=0; i<player.getSkills().length; i++)
        {

            if(player.items[i].skills[0].name !== "EMPTY")
            {
                for(let j=0; j<=player.items[i].rank; j++)
                {
                    player.getSkills()[i][j] = player.items[i].skills[j];
                }
            }
            else
            {
                player.getSkills()[i][0] = new Skill("EMPTY");
            }
        }
    }

    function resetSkills(player)
    {
        for(let i=0; i<6; i++)
        {
            player.getSkills()[i] = [];
            player.getSkills()[i][0] = new Skill("EMPTY");
        }
    }
}