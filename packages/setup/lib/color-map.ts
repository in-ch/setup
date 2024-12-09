/**
 * @description Color map for console.log
 */
const colorMap: { [key: string]: string } = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  orange: '\x1b[38;5;214m',
  white: '\x1b[37m',

  lightBlack: '\x1b[90m',
  lightRed: '\x1b[91m',
  lightGreen: '\x1b[92m',
  lightYellow: '\x1b[93m',
  lightBlue: '\x1b[94m',
  lightMagenta: '\x1b[95m',
  lightCyan: '\x1b[96m',
  lightWhite: '\x1b[97m',

  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',

  bgLightBlack: '\x1b[100m',
  bgLightRed: '\x1b[101m',
  bgLightGreen: '\x1b[102m',
  bgLightYellow: '\x1b[103m',
  bgLightBlue: '\x1b[104m',
  bgLightMagenta: '\x1b[105m',
  bgLightCyan: '\x1b[106m',
  bgLightWhite: '\x1b[107m',

  default: '\x1b[0m',
};

type Color = keyof typeof colorMap;

export default colorMap;
export { Color };
