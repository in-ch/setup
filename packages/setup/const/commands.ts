import { eslint } from 'commands/eslint.ts';
import { gitmessage } from 'commands/gitmessage.ts';
import { prettier } from 'commands/prettier.ts';
import { typescript } from 'commands/typescript.ts';

const COMMANDS = {
  ESLINT: 'eslint',
  PRETTIER: 'prettier',
  TYPESCRIPT: 'typescript',
  GITMESSAGE: 'gitmessage',
};
type CommandsTypes = (typeof COMMANDS)[keyof typeof COMMANDS];
const commandFuc = {
  [COMMANDS.ESLINT]: () => eslint(),
  [COMMANDS.PRETTIER]: () => prettier(),
  [COMMANDS.TYPESCRIPT]: () => typescript(),
  [COMMANDS.GITMESSAGE]: () => gitmessage(),
};
const extension = {
  [COMMANDS.ESLINT]: '.js',
  [COMMANDS.PRETTIER]: '.js',
  [COMMANDS.TYPESCRIPT]: '.json',
  [COMMANDS.GITMESSAGE]: '.txt',
};
const commandChoices = [
  { name: COMMANDS.ESLINT, value: COMMANDS.ESLINT },
  { name: COMMANDS.PRETTIER, value: COMMANDS.PRETTIER },
  { name: COMMANDS.TYPESCRIPT, value: COMMANDS.TYPESCRIPT },
  { name: COMMANDS.GITMESSAGE, value: COMMANDS.GITMESSAGE },
];

export { COMMANDS, CommandsTypes, commandFuc, commandChoices, extension };
