import FILE_ERROR from "src/const/error/error.ts";

export default function fileErrorHandle(error: unknown, message: string) {
  if (error instanceof Error) {
    console.error(`🥲 🥲 🥲 ${message}`);
    if (FILE_ERROR[error.code as keyof typeof FILE_ERROR]) {
      console.error(`Reason: ${FILE_ERROR[error.code as keyof typeof FILE_ERROR]}`);
    } else {
      console.error(`Reason: ${error.message}`);
    }
    process.exit(1);
  }
}