import path from 'path';

export default function getCliPath(): string {
  return path.join(__dirname, '../../../dist/index.js');
}
