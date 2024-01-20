import { readFileSync } from "fs";

export class WeatherData {
    dayOrTeam: string;
    maxVal: number;
    minVal: number;

    constructor(day: string, maxVal: number, minVal: number) {
        this.dayOrTeam = day;
        this.maxVal = maxVal;
        this.minVal = minVal;
    }

    getDifferenceValue() : number {
        return this.maxVal - this.minVal;
    }
}

export class WeatherReport {

    constructor() {

    }

    readWeatherDataFromFile(filePath: string): string | null {
        const fileContent = readFileSync(filePath, 'utf8');
        const lines : string[] = fileContent.split('\n').slice(2); // Skip the header lines and empty line
    
        const weatherDataList: WeatherData[] = [];
    
        for (const line of lines) {
            const weatherData : WeatherData | null = this.convertWeatherDataLine(line);
            if (weatherData) {
                weatherDataList.push(weatherData);
            }
        }

        const smallestSpread: string | null = this.getDayWithSmallestSpread(weatherDataList);
    
        return smallestSpread;
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
            const day : string = (columns[0] ? columns[0].toString() : "");
            const maxTemperature : number = parseInt(columns[1]);
            const minTemperature : number = parseInt(columns[2]);
            return new WeatherData(day, maxTemperature, minTemperature);
        }
        return null;
    }

    getDayWithSmallestSpread(weatherDataList: WeatherData[]): string | null {
        // assign max int value 9007199254740991
        let smallestSpread = Number.MAX_SAFE_INTEGER;
        let dayWithSmallestSpread: string | null = null;
    
        if (weatherDataList && weatherDataList.length > 0) {
            weatherDataList.forEach((weatherData : WeatherData)  => {
                const spread : number = weatherData.getDifferenceValue();
                if (spread < smallestSpread) {
                    smallestSpread = spread;
                    dayWithSmallestSpread = weatherData.dayOrTeam;
                }
            });
        }
        return dayWithSmallestSpread;
    }
}
