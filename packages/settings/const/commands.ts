import { eslint } from '../commands/eslint.ts';
import { prettier } from '../commands/prettier.ts';
import { typescript } from '../commands/typescript.ts';

const COMMANDS = {
  ESLINT: 'eslint',
  PRETTIER: 'prettier',
  TYPESCRIPT: 'typescript',
};
type CommandsTypes = (typeof COMMANDS)[keyof typeof COMMANDS];
const commandFuc = {
  [COMMANDS.ESLINT]: () => eslint(),
  [COMMANDS.PRETTIER]: () => prettier(),
  [COMMANDS.TYPESCRIPT]: () => typescript(),
};
const commandChoices = [
  { name: COMMANDS.ESLINT, value: COMMANDS.ESLINT },
  { name: COMMANDS.PRETTIER, value: COMMANDS.PRETTIER },
  { name: COMMANDS.TYPESCRIPT, value: COMMANDS.TYPESCRIPT },
];

export { COMMANDS, CommandsTypes, commandFuc, commandChoices };
