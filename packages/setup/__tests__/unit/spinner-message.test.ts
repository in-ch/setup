import createSpinnerMessage from 'lib/spinner-message.ts';

jest.mock('readline', () => ({
  cursorTo: jest.fn(),
}));

describe('createSpinnerMessage', () => {
  let spinner: ReturnType<typeof createSpinnerMessage>;
  let stdoutWriteSpy: jest.SpyInstance;

  beforeEach(() => {
    stdoutWriteSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    jest.useFakeTimers();
    spinner = createSpinnerMessage({ spinnerChars: ['|', '/', '-', '\\'], ms: 100, message: 'Loading...' });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should start the spinner and display the message', () => {
    spinner.start();

    jest.advanceTimersByTime(100);
    expect(stdoutWriteSpy).toHaveBeenCalledWith('| Loading...');

    jest.advanceTimersByTime(100);
    expect(stdoutWriteSpy).toHaveBeenCalledWith('/ Loading...');

    jest.advanceTimersByTime(100);
    expect(stdoutWriteSpy).toHaveBeenCalledWith('- Loading...');
  });

  it('should stop the spinner and clear the line', () => {
    spinner.start();
    spinner.stop();

    expect(stdoutWriteSpy).toHaveBeenCalledWith('\r \r');
  });

  it('should props should be applied appropriately', () => {
    spinner = createSpinnerMessage({ spinnerChars: ['1', '2', '3', '4'], ms: 100, message: 'MESSAGE' });
    spinner.start();

    jest.advanceTimersByTime(100);
    expect(stdoutWriteSpy).toHaveBeenCalledWith('1 MESSAGE');

    jest.advanceTimersByTime(100);
    expect(stdoutWriteSpy).toHaveBeenCalledWith('2 MESSAGE');

    jest.advanceTimersByTime(100);
    expect(stdoutWriteSpy).toHaveBeenCalledWith('3 MESSAGE');

    jest.advanceTimersByTime(100);
    expect(stdoutWriteSpy).toHaveBeenCalledWith('4 MESSAGE');
  });
});
