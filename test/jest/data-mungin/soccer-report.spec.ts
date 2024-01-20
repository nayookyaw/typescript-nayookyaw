import { SoccerData, SoccerReport } from "@/data-mungin/soccer-report";

describe('getTeamWithSmallestDifference with data', () => {
    it('should return the correct team with the smallest difference', () => {
        const soccerDataList : SoccerData[] = [
            new SoccerData("Man U", 58, 79),
            new SoccerData("Arsenal", 67, 32),
            new SoccerData("Chelsea", 63, 60)
        ]

        const soccerReport : SoccerReport = new SoccerReport();
        const teamWithSmallestDifference = soccerReport.getTeamWithSmallestDifference(soccerDataList);

        // expect 
        expect(teamWithSmallestDifference).toBe("Man U");
    });
});

describe('getTeamWithSmallestDifference null', () => {
    it('should return the correct team with the smallest difference', () => {
        const soccerDataList : SoccerData[] = []

        const soccerReport : SoccerReport = new SoccerReport();
        const teamWithSmallestDifference = soccerReport.getTeamWithSmallestDifference(soccerDataList);

        // expect 
        expect(teamWithSmallestDifference).toBeNull();
    });
});