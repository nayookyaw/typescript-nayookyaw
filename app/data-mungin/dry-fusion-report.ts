import { readFileSync } from "fs";
import { WeatherData } from "./weather-report";
import { SoccerData } from "./soccer-report";

interface DataItem {
    dayOrTeam: string;
    maxVal: number;
    minVal: number;
    getDifferenceValue(): number;
}

type columnCheckType = {
    "validLength" : number,
    "firstColumnIndex" : number,
    "secondColumnIndex" : number,
    "thirdColumnIndex": number,
}

// type DataRowFactory<T extends DataItem> = (dayOrTeam: string, maxVal: number, minVal: number) => T;

class ReportBase<T extends DataItem> {

    public readDataFromFile(
            filePath: string, 
            dataModel : new(dayOrTeam: string, maxVal: number, minVal: number) => T,
            sliceCount : number,
            columnCheckData: columnCheckType,
        ) : string | null
    {
        const fileContent = readFileSync(filePath, 'utf8');
        const lines : string[] = fileContent.split('\n').slice(sliceCount); // Adjust slicing if needed

        const dataRowList: T[] = [];
    
        for (const line of lines) {
            const dataRow : T | null = this.convertDataLine(line, dataModel, columnCheckData);
            if (dataRow) {
                dataRowList.push(dataRow);
            }
        }
        
        const differenceResp : T | null = this.getSmallestDifferenceItem(dataRowList);

        return (differenceResp && differenceResp.dayOrTeam) ? differenceResp.dayOrTeam : null;
    }

    protected convertDataLine(
            line: string, 
            dataModel : new(dayOrTeam: string, maxVal: number, minVal: number) => T,
            columnCheckData : columnCheckType
        ) : T | null 
    {
        const columns = line.trim().split(/\s+/);

        if (columns.length >= columnCheckData.validLength) {
            const dayOrTeam : string = (columns[columnCheckData.firstColumnIndex] ? columns[columnCheckData.firstColumnIndex].toString() : "");
            const maxVal : number = parseInt(columns[columnCheckData.secondColumnIndex]);
            const minVal : number = parseInt(columns[columnCheckData.thirdColumnIndex]);

            const returnModel = new dataModel(dayOrTeam, maxVal, minVal);
            return returnModel;
        }
        return null;
    }

    public getSmallestDifferenceItem(dataList: T[]): T | null {
        let smallestDifference : number = Number.MAX_SAFE_INTEGER;
        let itemWithSmallestDifference: T | null = null;

        if (dataList && dataList.length > 0) {
            dataList.forEach((item: T) => {
                const difference = item.getDifferenceValue();
                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    itemWithSmallestDifference = item;
                }
            });
        }
        return itemWithSmallestDifference;
    }
}

// Specific report classes using generics and inheritance
export class SoccerReportCommon extends ReportBase<SoccerData> {

}

export class WeatherReportCommon extends ReportBase<WeatherData> {

}
