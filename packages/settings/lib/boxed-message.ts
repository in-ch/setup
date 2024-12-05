import colorMap, { Color } from 'lib/color-map.ts';

interface BoxedMessageProps {
  messages: string[];
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  rtEdge?: string;
  ltEdge?: string;
  rbEdge?: string;
  lbEdge?: string;
  align?: 'left' | 'center' | 'right';
  borderColor?: Color;
  textColor?: Color;
}

/**
 * @param { string[] } messages - The messages to be boxed.
 * @param { number } [minWidth] - The minimum width of the box.
 * @param { number } [maxWidth] - The maximum width of the box.
 * @param { number } [minHeight] - The minimum height of the box.
 * @param { number } [maxHeight] - The maximum height of the box.
 * @param { string } [rtEdge] - The right top edge of the box.
 * @param { string } [ltEdge] - The left top edge of the box.
 * @param { string } [rbEdge] - The right bottom edge of the box.
 * @param { string } [lbEdge] - The left bottom edge of the box.
 * @param { 'left' | 'center' | 'right'} [align] - The alignment of the messages in the box.
 * @param { Color } [borderColor] - The color of the border.
 * @param { Color } [textColor] - The color of the text.
 * @description This function will draw a box with the given messages.
 * @returns { string } The messages boxed in a box as a string.
 */
export default function boxedMessage({
  messages,
  minWidth = 40,
  maxWidth = 999,
  minHeight = 5,
  maxHeight = 999,
  rtEdge = '╮',
  ltEdge = '╭',
  rbEdge = '╯',
  lbEdge = '╰',
  align = 'center',
  textColor = colorMap.default,
  borderColor = colorMap.default,
}: BoxedMessageProps): string {
  const borderColorCode = colorMap[borderColor!] || colorMap.default;
  const textColorCode = colorMap[textColor!] || colorMap.default;
  const defaultCode = colorMap.default;

  const maxLength = messages.reduce((max, message) => Math.max(max, message.length), 0);
  const boxWidth = Math.min(maxWidth, Math.max(minWidth, maxLength));

  const pad = (str: string) => {
    if (align === 'left') {
      return str.padEnd(boxWidth);
    } else if (align === 'right') {
      return str.padStart(boxWidth);
    } else if (align === 'center') {
      const totalPadding = boxWidth - str.length;
      const leftPadding = Math.floor(totalPadding / 2);
      const rightPadding = totalPadding - leftPadding;
      return ' '.repeat(leftPadding) + str + ' '.repeat(rightPadding);
    }
  };

  const borderTop = `${borderColorCode}${ltEdge}${'─'.repeat(boxWidth + 2)}${rtEdge}${defaultCode}`;
  const borderBottom = `${borderColorCode}${lbEdge}${'─'.repeat(
    boxWidth + 2,
  )}${rbEdge}${defaultCode}`;
  const emptyLine = `${borderColorCode}│${' '.repeat(boxWidth + 2)}│${defaultCode}`;

  const adjustedMessages = messages.slice(0, maxHeight - 2);
  const paddedMessages = adjustedMessages.map(
    (message: string) =>
      `${borderColorCode}│ ${textColorCode}${pad(
        message,
      )}${defaultCode} ${borderColorCode}│${defaultCode}`,
  );

  while (paddedMessages.length < minHeight - 2) {
    paddedMessages.push(emptyLine);
  }

  console.log({ messages });

  const boxedMessage = [borderTop, emptyLine, ...paddedMessages, borderBottom].join('\n');

  return boxedMessage;
}
