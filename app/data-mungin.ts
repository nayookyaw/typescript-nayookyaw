import { readFileSync } from "fs";

export class WeatherData {
    day: number;
    maxTemperature: number;
    minTemperature: number;

    constructor(day: number, maxTemperature: number, minTemperature: number) {
        this.day = day;
        this.maxTemperature = maxTemperature;
        this.minTemperature = minTemperature;
    }

    getTemperatureSpread() : number {
        return this.maxTemperature - this.minTemperature;
    }
}

export class WeatherReport {

    constructor() {

    }

    readWeatherDataFromFile(filePath: string): WeatherData[] {
        const fileContent = readFileSync(filePath, 'utf8');
        const lines = fileContent.split('\n').slice(2); // Skip the header lines and empty line
    
        const weatherDataList: WeatherData[] = [];
    
        for (const line of lines) {
            const weatherData = this.convertWeatherDataLine(line);
            if (weatherData) {
                weatherDataList.push(weatherData);
            }
        }

        this.getDayWithSmallestSpread(weatherDataList);
    
        return weatherDataList;
    }

    convertWeatherDataLine(line: string): WeatherData | null {
        // /: Delimiters used to define the beginning and end of the regular expression.
        // \s: Represents any whitespace character (spaces, tabs, line breaks).
        // +: Quantifier that matches one or more occurrences of the preceding \s.
        const columns = line.trim().split(/\s+/);
        
        /*
            day number (column one)
            maximum temperature is the second column
            minimum the third column
            make sure 3 columns are there
        */
        if (columns.length >= 3) {
            const day = parseInt(columns[0]);
            const maxTemperature = parseInt(columns[1]);
            const minTemperature = parseInt(columns[2]);
            return new WeatherData(day, maxTemperature, minTemperature);
        }
        return null;
    }

    getDayWithSmallestSpread(weatherDataList: WeatherData[]): number | null {
        // assign max int value 9007199254740991
        let smallestSpread = Number.MAX_SAFE_INTEGER;
        
        let dayWithSmallestSpread: number | null = null;
    
        if (weatherDataList && weatherDataList.length > 0) {
            weatherDataList.forEach((weatherData : WeatherData)  => {
                const spread = weatherData.getTemperatureSpread();
                if (spread < smallestSpread) {
                    smallestSpread = spread;
                    dayWithSmallestSpread = weatherData.day;
                }
            });
        }
        return dayWithSmallestSpread;
    }
}
