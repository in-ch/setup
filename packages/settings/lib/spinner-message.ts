import readline from 'readline';

/**
 * This function creates a spinner message.
 * @param {string[]} [spinnerChars] - The characters to use for the spinner.
 * @param {number} [ms] - The time in milliseconds
 * @returns {start: () => void; stop: () => void} - The start and stop functions.
 */
export default function createSpinnerMessage({
  spinnerChars = ['|', '/', '-', '\\'],
  ms = 100,
  message = '',
}): {
  start: () => void;
  stop: () => void;
} {
  let current = 0;
  let interval: NodeJS.Timeout;

  function start(msg = message) {
    interval = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${spinnerChars[current]} ${msg}`);
      current = (current + 1) % spinnerChars.length;
    }, ms);
  }

  function stop() {
    clearInterval(interval);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write('\r \r');
  }

  return { start, stop };
}
