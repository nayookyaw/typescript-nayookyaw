import { readFileSync } from "fs";

export class SoccerData {
    dayOrTeam: string;
    maxVal: number;
    minVal: number;

    constructor(dayOrTeam: string, maxVal: number, minVal: number) {
        this.dayOrTeam = dayOrTeam;
        this.maxVal = maxVal;
        this.minVal = minVal;
    }

    getDifferenceValue() : number {
        return this.maxVal - this.minVal;
    }
}

export class SoccerReport {
    constructor() {

    }

    readSoccerDataFromFile(filePath: string) : string | null {
        const fileContent = readFileSync(filePath, 'utf-8');
        const lines : string[] = fileContent.split('\n').slice(1); // skip header

        
        const soccerDataList: SoccerData[] = [];
        for (const line of lines) {
            const soccerData : SoccerData | null = this.convertSoccerDataLine(line);
            if (soccerData) {
                soccerDataList.push(soccerData);
            }
        }

        const smallestDiff: string | null = this.getTeamWithSmallestDifference(soccerDataList);

        return smallestDiff;
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
                const difference : number = soccerData.getDifferenceValue();
                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    teamWithSmallestDifference = soccerData.dayOrTeam;
                }
            })
        }
        return teamWithSmallestDifference;
    }

 }