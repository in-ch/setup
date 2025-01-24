import { exec } from 'child_process';

/**
 * @param {string} packageName package name
 * @returns {Promise<string>} latest version of the package
 */
export default function checkLatestPkgVersion(packageName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`npm show ${packageName} version`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error fetching latest version: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`Error: ${stderr}`);
                return;
            }
            resolve(stdout.trim());
        });
    });
}