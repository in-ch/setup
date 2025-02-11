import { commitLint } from 'commands/commitlint.ts';
import { eslint } from 'commands/eslint.ts';
import { gitmessage } from 'commands/gitmessage.ts';
import { husky } from 'commands/husky.ts';
import { prettier } from 'commands/prettier.ts';
import { typescript } from 'commands/typescript.ts';

const COMMANDS = {
  ESLINT: 'eslint',
  PRETTIER: 'prettier',
  TYPESCRIPT: 'typescript',
  GITMESSAGE: 'gitmessage',
  HUSKY: 'husky',
  COMMIT_LINT: 'commitlint',
  LINT_STAGE: 'lintstage',
  AIRBNB: 'airbnb',
  GOOGLE: 'google',
  XO: 'xo',
};

const filteredCommands = Object.entries(COMMANDS)
  .filter(([key]) => ![COMMANDS.AIRBNB, COMMANDS.GOOGLE, COMMANDS.XO].includes(key))
  .map(([key, value]) => ({ name: key, value }));
const filteredCommandChoices = filteredCommands.map(command => command.value);

type CommandsTypes = (typeof COMMANDS)[keyof typeof COMMANDS];
const commandFuc = {
  [COMMANDS.ESLINT]: () => eslint(),
  [COMMANDS.PRETTIER]: () => prettier(),
  [COMMANDS.TYPESCRIPT]: () => typescript(),
  [COMMANDS.GITMESSAGE]: () => gitmessage(),
  [COMMANDS.HUSKY]: () => husky(),
  [COMMANDS.COMMIT_LINT]: () => commitLint(),
};
const extension = {
  [COMMANDS.ESLINT]: '.js',
  [COMMANDS.PRETTIER]: '.js',
  [COMMANDS.TYPESCRIPT]: '.json',
  [COMMANDS.GITMESSAGE]: '.txt',
  [COMMANDS.COMMIT_LINT]: '.json',
  [COMMANDS.LINT_STAGE]: '.json',
  [COMMANDS.AIRBNB]: '.js',
  [COMMANDS.GOOGLE]: '.js',
  [COMMANDS.XO]: '.js',
};
const commandChoices = [
  { name: COMMANDS.ESLINT, value: COMMANDS.ESLINT },
  { name: COMMANDS.PRETTIER, value: COMMANDS.PRETTIER },
  { name: COMMANDS.TYPESCRIPT, value: COMMANDS.TYPESCRIPT },
  { name: COMMANDS.GITMESSAGE, value: COMMANDS.GITMESSAGE },
  { name: COMMANDS.HUSKY, value: COMMANDS.HUSKY },
  { name: COMMANDS.COMMIT_LINT, value: COMMANDS.COMMIT_LINT },
];
const eslintConfigTypeChoices = [
  { name: 'Import Sort', value: 'import-sort' },
  { name: 'Airbnb', value: 'airbnb' },
  { name: 'Google', value: 'google' },
  { name: 'XO', value: 'xo' },
];

const eslintConfigTypeChoicesValue = eslintConfigTypeChoices.reduce(
  (acc, choice) => {
    acc[choice.value] = choice.value;
    return acc;
  },
  {} as Record<string, string>
);

export {
  COMMANDS,
  commandFuc,
  commandChoices,
  extension,
  eslintConfigTypeChoices,
  eslintConfigTypeChoicesValue,
  filteredCommands,
  filteredCommandChoices,
};
export type { CommandsTypes };
