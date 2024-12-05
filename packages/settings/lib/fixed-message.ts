interface FixedMessageProps {
  message: string;
}

/**
 * @param {string} message - The message to be displayed.
 * @description This function will display a fixed message on the console.
 * @returns { void } console with the fixed messages
 */
export default function fixedMessage({ message }: FixedMessageProps) {
  process.stdout.write('\x1b[H');
  setInterval(() => {
    process.stdout.write('\x1b[2J\x1b[0f');
    process.stdout.write(message);
  }, 100);
}
