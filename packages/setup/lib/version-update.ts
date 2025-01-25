import checkLatestPkgVersion from "./check-latest-pkg-version.ts";
import { execSync } from "child_process";
import { getPackageInfo } from "./get-package-info.ts";
import { confirm } from '@inquirer/prompts';

export default async function versionCheckAndUpdate() {
    const latestVersion = await checkLatestPkgVersion("@in-ch/setup");
    const currentVersion = await getPackageInfo().version;

    if (currentVersion !== latestVersion) {
        const isUpdateLatestVersion = await confirm({
            message: `The latest version is ${latestVersion}, but the current version is ${currentVersion}. An update is needed. Would you like to update?`,
        });
        if(isUpdateLatestVersion) {
            execSync("npm install @in-ch/setup@latest -g", { stdio: "inherit" });
            console.log("Update completed successfully.");
        }
    }
}