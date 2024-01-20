import { WeatherReport, WeatherData } from '@/data-mungin/weather-report';

describe('getDayWithSmallestSpread with data', () => {
    it('should return the correct day with the smallest temperature spread', () => {
        const testWeatherDataList : WeatherData[] = [
            // weather data format WeatherData { day: 1, maxTemperature: 30, minTemperature: 20 }
            new WeatherData(1, 50, 20),
            new WeatherData(2, 40, 35),
            new WeatherData(3, 60, 59)
        ]

        const weatherReport : WeatherReport = new WeatherReport();
        const dayWithSmallestSpread : number | null = weatherReport.getDayWithSmallestSpread(testWeatherDataList);

        // expect 3 since 60-59=1 is the smallest number
        expect(dayWithSmallestSpread).toBe(3);
    });
});

describe('getDayWithSmallestSpread null', () => {
    it('should return the correct day with the smallest temperature spread', () => {
        const testWeatherDataList : WeatherData[] = []

        const weatherReport : WeatherReport = new WeatherReport();
        const dayWithSmallestSpread : number | null = weatherReport.getDayWithSmallestSpread(testWeatherDataList);

        // expect null since input is []
        expect(dayWithSmallestSpread).toBeNull();
    });
});