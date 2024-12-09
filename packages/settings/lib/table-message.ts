import colorMap from 'lib/color-map.ts';
import convertFromObjects, { Row } from 'lib/convert-from-objects.ts';

interface BoxedMessageProps {
  data: Row[];
  textColor?: keyof typeof colorMap;
  headerColor?: keyof typeof colorMap;
  borderColor?: keyof typeof colorMap;
}

/**
 * @template Color - keyof typeof colorMap
 * @param {Row[]} data table data
 * @param {Color} [textColor] text color
 * @param {Color} [headerColor] header color
 * @param {Color} [borderColor] border color
 * @description This function will draw a table with the given data
 * @returns {string} the table as a string
 */
export default function tableMessage({
  data,
  textColor = colorMap.default,
  headerColor = colorMap.default,
  borderColor = colorMap.default,
}: BoxedMessageProps): string {
  const { rows, column } = convertFromObjects(data);
  const borderColorCode = colorMap[borderColor ?? 'default'];
  const headerColorCode = colorMap[headerColor ?? 'default'];
  const textColorCode = colorMap[textColor ?? 'default'];

  const initialLength = column.map(message => message.length + 2);
  const boxWidths = initialLength.map((col, index) => {
    return rows.reduce((length, row) => Math.max(row[index]!.length + 2, length), col);
  });
  const padIndex = (str: string, index: number) => `${textColorCode}${str.padEnd(boxWidths[index]!)}`;
  const padHeaderIndex = (str: string, index: number) => `${headerColorCode}${str.padEnd(boxWidths[index]!)}`;
  const drawHeaderTopBoder = () =>
    `${borderColorCode}┌${column.map((_, index) => ''.padEnd(boxWidths[index]! + 1, `─`)).join('┬')}┐`;
  const drawHeaderBottomBoder = () =>
    `${borderColorCode}├${column.map((_, index) => ''.padEnd(boxWidths[index]! + 1, `─`)).join('┼')}┤`;
  const drawFooterBottomBoder = () =>
    `${borderColorCode}└${column.map((_, index) => ''.padEnd(boxWidths[index]! + 1, `─`)).join('┴')}┘`;

  let table = '';
  // Draw the top border
  table += drawHeaderTopBoder() + '\n';
  table += `${borderColorCode}│ ${column.map(padHeaderIndex).join(`${borderColorCode}│ `)}${borderColorCode}│\n`;
  table += drawHeaderBottomBoder() + '\n';
  rows.forEach(row => {
    table += `${borderColorCode}│ ${row.map(padIndex).join(`${borderColorCode}│ `)}│\n`;
  });
  // Draw the bottom border
  table += `${drawFooterBottomBoder()}${colorMap['default']}\n`;

  return table;
}
