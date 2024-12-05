import { eslint } from '../commands/eslint.ts';
import { prettier } from '../commands/prettier.ts';

const COMMANDS = {
  ESLINT: 'eslint',
  PRETTIER: 'prettier',
};
type CommandsTypes = (typeof COMMANDS)[keyof typeof COMMANDS];
const commandFuc = {
  [COMMANDS.ESLINT]: () => eslint(),
  [COMMANDS.PRETTIER]: () => prettier(),
};
const commandChoices = [
  { name: COMMANDS.ESLINT, value: COMMANDS.ESLINT },
  { name: COMMANDS.PRETTIER, value: COMMANDS.PRETTIER },
];

export { COMMANDS, CommandsTypes, commandFuc, commandChoices };
