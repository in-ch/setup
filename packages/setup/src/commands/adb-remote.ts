#!/usr/bin/env node
import { exec } from 'child_process';
import { Command } from 'commander';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * @description
 * This command will connect to ADB device wirelessly
 */
export const adbRemoteCli = new Command()
  .command('adb-remote')
  .description('Connect to ADB device wirelessly')
  .action(async () => {
    try {
      console.log(`Checking connected ADB devices...`);

      const { stdout: devicesOutput } = await execAsync('adb devices');
      const devices = devicesOutput
        .split('\n')
        .filter(line => line.includes('\tdevice'))
        .map(line => line.split('\t')[0])
        .filter(device => device?.trim() !== '');

      if (devices.length === 0) {
        console.log(`No ADB devices connected. \nPlease connect a device via USB first.`);
        return;
      }

      console.log(`Found ${devices.length} connected device(s):`);
      devices.forEach(device => {
        console.log(`  ${device}`);
      });

      console.log(`\nGetting device IP address...`);

      const { stdout: ipOutput } = await execAsync('adb shell ip addr show wlan0');
      const ipMatch = ipOutput.match(/inet (\d+\.\d+\.\d+\.\d+)/);

      if (!ipMatch) {
        console.log(`Could not find IP address for wlan0 interface.`);
        return;
      }

      const deviceIp = ipMatch[1];
      console.log(`Device IP address: ${deviceIp}`);
      console.log(`\nEnabling TCP/IP mode on port 5555...`);

      await execAsync('adb tcpip 5555');
      console.log(`TCP/IP mode enabled on port 5555`);
      console.log(`\nConnecting wirelessly...`);

      await execAsync(`adb connect ${deviceIp}:5555`);
      console.log(`Successfully connected to ${deviceIp}:5555`);
      console.log(`\nVerifying wireless connection...`);

      const { stdout: finalDevicesOutput } = await execAsync('adb devices');
      console.log(`Current ADB devices:`);
      console.log(finalDevicesOutput);

      console.log(`\n ADB remote connection established successfully!`);
      console.log(`You can now disconnect the USB cable and use ADB wirelessly.`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);

      if (error instanceof Error && error.message.includes('adb: command not found')) {
        console.log(`Make sure ADB is installed and added to your PATH.`);
        console.log(`You can install it via Android SDK Platform Tools.`);
        console.log(`Download from: https://developer.android.com/studio/releases/platform-tools`);
      }
    }
  });
