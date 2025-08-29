/**
 * @description
 * Something do for Error handle
 *
 * @param {unknown} error Error Object
 * @returns {void}
 */
export default function ErrorHandle(error: unknown): void {
  if (error instanceof Error) {
    console.error('❌ Error:', error.message);
    
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  } else if (typeof error === 'string') {
    console.error('❌ Error:', error);
  } else {
    console.error('❌ Unknown error occurred:', error);
  }
  
  process.exit(1);
}

/**
 * @description
 * Log the error and decide whether to continue
 *
 * @param {unknown} error Error Object
 * @param {string} context Error context
 * @returns {boolean} Whether to continue
 */
export function logErrorAndContinue(error: unknown, context?: string): boolean {
  const prefix = context ? `[${context}]` : '';
  
  if (error instanceof Error) {
    console.warn(`⚠️  ${prefix} Warning:`, error.message);
  } else if (typeof error === 'string') {
    console.warn(`⚠️  ${prefix} Warning:`, error);
  } else {
    console.warn(`⚠️  ${prefix} Unknown warning:`, error);
  }
  
  return true; // 계속 진행
}
