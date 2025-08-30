import fs from 'fs';
import path from 'path';

/**
 * Check if the file exists
 * @param {string} filePath File path
 * @returns {boolean} true or false
 */
export const fileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

/**
 * Check if the directory exists
 * @param {string} dirPath Directory path
 * @returns {boolean} true or false
 */
export const directoryExists = (dirPath: string): boolean => {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
};

/**
 * Read the file
 * @param {string} filePath File path
 * @param {BufferEncoding} encoding Encoding (default: 'utf-8')
 * @returns {string | null} File content or null
 */
export const readFileSafely = (filePath: string, encoding: BufferEncoding = 'utf-8'): string | null => {
  try {
    return fs.readFileSync(filePath, encoding);
  } catch (error) {
    console.warn(`Failed to read file: ${filePath}`, error);
    return null;
  }
};

/**
 * Write the file
 * @param {string} filePath File path
 * @param {string} content File content
 * @param {BufferEncoding} encoding Encoding (default: 'utf-8')
 * @returns {boolean} true or false
 */
export const writeFileSafely = (
  filePath: string, 
  content: string, 
  encoding: BufferEncoding = 'utf-8'
): boolean => {
  try {
    const dir = path.dirname(filePath);
    if (!directoryExists(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, encoding);
    return true;
  } catch (error) {
    console.error(`Failed to write file: ${filePath}`, error);
    return false;
  }
};

/**
 * Normalize the path
 * @param {string} filePath File path
 * @returns {string} Normalized path
 */
export const normalizePath = (filePath: string): string => {
  return path.normalize(filePath);
};

/**
 * Convert to absolute path
 * @param {string} filePath File path
 * @returns {string} Absolute path
 */
export const resolvePath = (filePath: string): string => {
  return path.resolve(filePath);
};

/**
 * Extract the file extension
 * @param {string} filePath File path
 * @returns {string} File extension
 */
export const getFileExtension = (filePath: string): string => {
  return path.extname(filePath);
};

/**
 * Extract the file name
 * @param {string} filePath File path
 * @returns {string} File name
 */
export const getFileName = (filePath: string): string => {
  return path.basename(filePath, path.extname(filePath));
};
