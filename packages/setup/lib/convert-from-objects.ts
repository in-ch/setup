export interface Row {
  [key: string]: string;
}

interface ConvertedData {
  column: string[];
  rows: string[][];
}

/**
 * @param {Row[]} data The data to be converted
 * @description Convert data from objects to arrays
 * @returns {ConvertedData} Return the converted data with structured rows and columns.
 */
export default function convertFromObjects(data: Row[]): ConvertedData {
  if (data.length === 0 || data[0] === undefined) {
    return { column: [], rows: [] };
  }
  const column = Object.keys(data[0]);
  const rows = data.map(row => column.map(key => row[key] || ''));
  return { column, rows };
}
