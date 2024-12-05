import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const PACKAGE_NAME = process.cwd();

const isCommonModule = PACKAGE_NAME.includes('package/common-module');
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
};
const extensions = ['.js', '.ts', '.tsx'];

const babelOptions = {
  exclude: /node_modules/,
  extensions,
  configFile: '../../babel.config.json',
  babelHelpers: 'runtime',
};
const nodeOptions = {
  extensions,
};
const typescriptOptions = {
  tsconfig: `${PACKAGE_NAME}/tsconfig.json`,
  declaration: true,
  declarationDir: 'dist',
  emitDeclarationOnly: true,
  declarationMap: true,
  exclude: ['**/__tests__', '**/*.test.ts', '**/*.test.tsx'],
  module: 'NodeNext',
  moduleResolution: 'NodeNext',
};

export default {
  input: `${PACKAGE_NAME}/src/index.ts`,
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'auto',
      entryFileNames: `index.cjs.js`,
    },
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: `index.esm.js`,
    },
  ],
  plugins: [
    nodeResolve(nodeOptions),
    typescript(typescriptOptions),
    babel(babelOptions),
    commonjs(commonjsOptions),
    terser(),
  ],
  treeshake: !isCommonModule,
};
