console.log("skillpattern.js loaded");

function SkillPattern(pattern)
{
    this.pattern = pattern;

    this.getSkillPatternHeight = getSkillPatternHeight;
    this.getSkillPatternWidth  = getSkillPatternWidth;
    this.getSkillPatternValue  = getSkillPatternValue;

    function getSkillPatternValue(x, y)
    {
        return this.pattern[y][x];
    }

    function getSkillPatternHeight()
    {
        //IMPORTAN: NOW IT CAN ONLY DO 3*3 OR SMALLER, SHOULD BE REWRITTEN
        let height = 0;
        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if(this.pattern[i][j]!=NUL)
                {
                    height++;
                    break;
                }
            }
        }
        return height;
        //return this.pattern.length;
    }

    function getSkillPatternWidth()
    {
        //IMPORTAN: NOW IT CAN ONLY DO 3*3 OR SMALLER, SHOULD BE REWRITTEN
        let width = 0;
        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if(this.pattern[j][i]!=NUL)
                {
                    width++;
                    break;
                }
            }
        }
        return width;
        //return this.pattern[0].length;
    }
}