#!/usr/bin/env node
import { exec } from 'child_process';
import { Command } from 'commander';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * @description
 * This command will reload ADB device
 */
export const adbReloadCli = new Command()
  .command('adb-reload')
  .description('Reload ADB device')
  .action(async () => {
    try {
      console.log(`Reloading ADB device...`);
      console.log('\n');

      await execAsync('adb version');
      await execAsync('adb kill-server');
      await execAsync('adb start-server');

      const { stdout } = await execAsync('adb devices');
      console.log(`📱 Connected devices:`);
      console.log(stdout);

      console.log(`\n ADB reload completed successfully!`);
    } catch (error) {
      console.error(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);

      if (error instanceof Error && error.message.includes('adb: command not found')) {
        console.log(`Make sure ADB is installed and added to your PATH.`);
        console.log(`You can install it via Android SDK Platform Tools.`);
        console.log(`Download from: https://developer.android.com/studio/releases/platform-tools`);
      }
    }
  });
