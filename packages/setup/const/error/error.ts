const FILE_ERROR = {
  EACCES: 'Permission denied. Try running the command with administrator privileges.',
  ENOENT: 'Directory not found. Ensure you are in the correct project directory.',
  ENOSPC: 'No space left on device. The disk is full. Free up some disk space and try again.',
  UNKNOWN: 'An unexpected file system error occurred.',
};

export default FILE_ERROR;