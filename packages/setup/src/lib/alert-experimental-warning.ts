/**
 * @description
 * Alert the user that the command is in experimental mode
 */
export default function alertExperimentalWarning(): void {
  console.log(
    "This command is in experimental mode. As it's not a finalized feature for a formal release, please use it with caution."
  );
}
