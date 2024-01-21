import { WeatherReportCommon } from "@/data-mungin/dry-fusion-report";
import { WeatherData } from "@/data-mungin/weather-report";
import {join} from "path";

describe("get weather data dat file using common class", () => {
    test ('should return the correct weather data', () => {
        const weatherCommon : WeatherReportCommon = new WeatherReportCommon();
        console.log (__dirname);
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