import { SoccerReportCommon, WeatherReportCommon } from "@/data-mungin/dry-fusion-report";
import { SoccerData } from "@/data-mungin/soccer-report";
import { WeatherData } from "@/data-mungin/weather-report";
import {join} from "path";

describe("get weather data dat file using common class", () => {
    test ('should return the correct smallest temperature spread data', () => {
        const weatherCommon : WeatherReportCommon = new WeatherReportCommon();
        const weatherFilePath = join(__dirname, '../../../app/resources/weather.dat');
        const smallestWeatherData = weatherCommon.readDataFromFile(weatherFilePath, WeatherData, 2, {
            "validLength" : 3,
            "firstColumnIndex" : 0,
            "secondColumnIndex" : 1,
            "thirdColumnIndex" : 2,
        });

        // expect 14
        expect(smallestWeatherData).toBe("14")
    });
});

describe("get soccer data dat file using common class", () => {
    test ('should return the correct smallest difference data', () => {
        const soccerCommon : SoccerReportCommon = new SoccerReportCommon();
        const soccerFilePath = join(__dirname, '../../../app/resources/football.dat');
        const smallestWeatherData = soccerCommon.readDataFromFile(soccerFilePath, SoccerData, 1, {
            "validLength" : 8,
            "firstColumnIndex" : 1,
            "secondColumnIndex" : 6,
            "thirdColumnIndex" : 8,
        });

        // expect Leicester
        expect(smallestWeatherData).toBe("Leicester")
    });
});