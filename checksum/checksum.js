'use strict';
import fs from 'fs';

export function checkSum (data) {
  if (!data) {
    throw Error ('data is undefined');
  }
  if (typeof data !== 'string') {
    throw Error ('data is not a string');
  }
  const dataArray = [...data].map(character => {
    const parsedData = parseInt(character);
    if (isNaN(parsedData)) {
      throw Error ('parsed data is not a number');
    }
    return parsedData;
  })

  let result = 0;

  for (let i = 0; i < dataArray.length - 1; i++) {
    const element = dataArray[i];
    const nextElement = dataArray[i + 1];

    if (element === nextElement) {
      result += element;
    } 
  }
  if (dataArray[0] === dataArray[dataArray.length - 1])  {
    result += dataArray[0];
  }
  return result;
}

export function checkSumTsv (filename) {
  const file = fs.readFileSync(filename, {encoding:'utf-8'})
  const lines = file.split('\n')
  let result = 0;
  for(const lineIndex in lines) {
    const line = lines[lineIndex];
    const stringArr = line.trim().split('\t');
    const convertedNumbers = stringArr.map(string => {
      const parsedInt = parseInt(string);
      if (isNaN(parsedInt)) {
        throw Error('data is not a number')
      }
      return parsedInt;
    })
    const max = Math.max(...convertedNumbers);
    const min = Math.min(...convertedNumbers);

    const difference = max - min
    result += difference;
  }
  return result;
}