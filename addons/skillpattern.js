console.log("skillpattern.js loaded");

function SkillPattern(pattern)
{
    this.pattern = pattern;
    let original_pattern = JSON.parse(JSON.stringify(this.pattern)); //passing by value instead of reference

    clearEmptyRow(original_pattern);
    clearEmptyColumn(original_pattern);

    this.pattern = JSON.parse(JSON.stringify(original_pattern));

    function clearEmptyRow(pattern)
    {
        let count_clear_row = 0;
        for(let j=0; j<pattern[0].length; j++)
        {
            if(pattern[0][j] === NUL)
            {
                count_clear_row++;
            }
        }
        if(count_clear_row === pattern[0].length)
        {
            for(let i=1; i<pattern.length; i++)
            {
                for(let j=0; j<pattern[i].length; j++)
                {
                    pattern[i-1][j] = pattern[i][j];
                }
            }
            for(let j=0; j<pattern[pattern.length-1].length; j++)
            {
                pattern[pattern.length-1][j] = NUL;
            }
            clearEmptyRow(pattern);
        }
    }

    function clearEmptyColumn(pattern)
    {
        let count_clear_column = 0;
        for(let i=0; i<pattern.length; i++)
        {
            if(pattern[i][0] === NUL)
            {
                count_clear_column++;
            }
        }
        if(count_clear_column === pattern.length)
        {
            for(let i=0; i<pattern.length; i++)
            {
                for(let j=0; j<pattern[i].length-1; j++)
                {
                    pattern[i][j] = pattern[i][j+1];
                }
            }
            for(let i=0; i<pattern.length; i++)
            {
                pattern[i][pattern[i].length-1] = NUL;
            }
            clearEmptyColumn(pattern);
        }
    }

    this.getSkillPatternHeight = getSkillPatternHeight;
    this.getSkillPatternWidth  = getSkillPatternWidth;
    this.getSkillPatternValue  = getSkillPatternValue;
    this.rotateSkillPattern    = rotateSkillPattern;
    this.mirrorSkillPattern    = mirrorSkillPattern;
    this.transformSkillPattern = transformSkillPattern;
    this.resetOriginalPattern  = resetOriginalPattern;

    function resetOriginalPattern()
    {
        this.pattern = JSON.parse(JSON.stringify(original_pattern));
    }

    function getSkillPatternValue(x, y)
    {
        return this.pattern[y][x];
    }

    function getSkillPatternHeight()
    {
        //IMPORTAN: NOW IT CAN ONLY DO 3*3 OR SMALLER, SHOULD BE REWRITTEN
        let height = [];
        height[0] = 0;
        height[1] = 0;
        height[2] = 0;

        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if(this.pattern[i][j]!==NUL)
                {
                    height[i]++;
                    break;
                }
            }
        }
        if(height[0]>0 && height[2]>0) return 3;
        if(height[0]>0 && height[1]>0) return 2;
        if(height[1]>0 && height[2]>0) return 2;
        if(height[0]>0) return 1;
        return 0;
        //return this.pattern.length;
    }

    function getSkillPatternWidth()
    {
        //IMPORTAN: NOW IT CAN ONLY DO 3*3 OR SMALLER, SHOULD BE REWRITTEN
        let width = [];
        width[0] = 0;
        width[1] = 0;
        width[2] = 0;
        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if(this.pattern[j][i]!==NUL)
                {
                    width[i]++;
                    break;
                }
            }
        }
        if(width[0]>0 && width[2]>0) return 3;
        if(width[0]>0 && width[1]>0) return 2;
        if(width[1]>0 && width[2]>0) return 2;
        if(width[0]>0) return 1;
        return 0;
        //return this.pattern[0].length;
    }

    function rotateSkillPattern(direction)
    {
        let new_pattern = JSON.parse(JSON.stringify(this.pattern));

        if(direction === ROTATE_RIGHT)
        {
            new_pattern[0][0] = this.pattern[2][0];
            new_pattern[0][2] = this.pattern[0][0];
            new_pattern[2][2] = this.pattern[0][2];
            new_pattern[2][0] = this.pattern[2][2];

            new_pattern[0][1] = this.pattern[1][0];
            new_pattern[1][2] = this.pattern[0][1];
            new_pattern[2][1] = this.pattern[1][2];
            new_pattern[1][0] = this.pattern[2][1];
        }
        else if(direction === ROTATE_LEFT)
        {
            new_pattern[0][0] = this.pattern[0][2];
            new_pattern[0][2] = this.pattern[2][2];
            new_pattern[2][2] = this.pattern[2][0];
            new_pattern[2][0] = this.pattern[0][0];

            new_pattern[0][1] = this.pattern[1][2];
            new_pattern[1][2] = this.pattern[2][1];
            new_pattern[2][1] = this.pattern[1][0];
            new_pattern[1][0] = this.pattern[0][1];
        }

        clearEmptyRow(new_pattern);
        clearEmptyColumn(new_pattern);

        let same = true;

        for(let i=0; i<new_pattern.length; i++)
        {
            for(let j=0; j<pattern[i].length; j++)
            {
                if(new_pattern[i][j] !== this.pattern[i][j])
                {
                    same = false;
                }
            }
        }

        if(same)
        {
            return false;
        }
        else
        {
            this.pattern = JSON.parse(JSON.stringify(new_pattern));
            return true;
        }
    }

    function mirrorSkillPattern(type)
    {
        let new_pattern = JSON.parse(JSON.stringify(this.pattern));

        if(type === MIRROR_VERTICALLY)
        {
            new_pattern[0][0] = this.pattern[0][2];
            new_pattern[1][0] = this.pattern[1][2];
            new_pattern[2][0] = this.pattern[2][2];

            new_pattern[0][2] = this.pattern[0][0];
            new_pattern[1][2] = this.pattern[1][0];
            new_pattern[2][2] = this.pattern[2][0];
        }
        else if(type === MIRROR_HORIZONTALLY)
        {
            new_pattern[0][0] = this.pattern[2][0];
            new_pattern[0][1] = this.pattern[2][1];
            new_pattern[0][2] = this.pattern[2][2];

            new_pattern[2][0] = this.pattern[0][0];
            new_pattern[2][1] = this.pattern[0][1];
            new_pattern[2][2] = this.pattern[0][2];
        }

        clearEmptyRow(new_pattern);
        clearEmptyColumn(new_pattern);

        let same = true;

        for(let i=0; i<new_pattern.length; i++)
        {
            for(let j=0; j<pattern[i].length; j++)
            {
                if(new_pattern[i][j] !== this.pattern[i][j])
                {
                    same = false;
                }
            }
        }

        if(same)
        {
            return false;
        }
        else
        {
            this.pattern = JSON.parse(JSON.stringify(new_pattern));
            return true;
        }
    }

    function transformSkillPattern(type)
    {
        let new_pattern = JSON.parse(JSON.stringify(this.pattern));

        if(type === MAGIC_TO_MOVE)
        {
            for(let i=0; i<new_pattern.length; i++)
            {
                for(let j=0; j<new_pattern[i].length; j++)
                {
                    if(new_pattern[i][j] === MAN)
                    {
                        new_pattern[i][j] = MOV;
                    }
                }
            }
        }
        else if(type === DEFENSE_TO_ATTACK)
        {
            for(let i=0; i<new_pattern.length; i++)
            {
                for(let j=0; j<new_pattern[i].length; j++)
                {
                    if(new_pattern[i][j] === DEF)
                    {
                        new_pattern[i][j] = ATT;
                    }
                }
            }
        }

        clearEmptyRow(new_pattern);
        clearEmptyColumn(new_pattern);

        let same = true;

        for(let i=0; i<new_pattern.length; i++)
        {
            for(let j=0; j<pattern[i].length; j++)
            {
                if(new_pattern[i][j] !== this.pattern[i][j])
                {
                    same = false;
                }
            }
        }

        if(same)
        {
            return false;
        }
        else
        {
            this.pattern = JSON.parse(JSON.stringify(new_pattern));
            return true;
        }
    }
}