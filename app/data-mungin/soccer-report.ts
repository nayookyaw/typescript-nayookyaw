import { readFileSync } from "fs";

export class SoccerData {
    teamName: string;
    forGoal: number;
    againstGoal: number;

    constructor(teamName: string, forGoal: number, againstGoal: number) {
        this.teamName = teamName;
        this.forGoal = forGoal;
        this.againstGoal = againstGoal;
    }

    getGoalDifference() : number {
        return this.forGoal - this.againstGoal;
    }
}

export class SoccerReport {
    constructor() {

    }

    readSoccerDataFromFile(filePath: string) : SoccerData[] {
        const fileContent = readFileSync(filePath, 'utf-8');
        const lines : string[] = fileContent.split('\n').slice(1); // skip header

        
        const soccerDataList: SoccerData[] = [];
        for (const line of lines) {
            const soccerData : SoccerData | null = this.convertSoccerDataLine(line);
            if (soccerData) {
                soccerDataList.push(soccerData);
            }
        }

        this.getTeamWithSmallestDifference(soccerDataList);

        return soccerDataList;
    }

    convertSoccerDataLine(line: string): SoccerData | null {
        const columns = line.trim().split(/\s+/);
        
        // filter the unnecessary data
        if (columns.length >= 8) {
            const teamName : string = columns[1];
            const forGoal : number = parseInt(columns[6]);
            const againstGoal : number = parseInt(columns[8]);
            return new SoccerData(teamName, forGoal, againstGoal);
        }
        return null;
    }

    getTeamWithSmallestDifference(soccerDataList : SoccerData[]) : string | null {
        let smallestDifference = Number.MAX_SAFE_INTEGER;
        let teamWithSmallestDifference: string | null = null;

        if (soccerDataList && soccerDataList.length > 0) {
            soccerDataList.forEach((soccerData : SoccerData) => {
                const difference : number = soccerData.getGoalDifference();
                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    teamWithSmallestDifference = soccerData.teamName;
                }
            })
        }
        return teamWithSmallestDifference;
    }

 }