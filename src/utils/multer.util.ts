// src/utils/multer.util.ts
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import type { Options as MulterOptions } from 'multer';

export function insertFile(
  folderPath: string,
  allowedExtensions: RegExp,
  maxFileSize: number = 2 * 1024 * 1024,
  message: string = `${allowedExtensions.toString()}`,
): MulterOptions {
  return {
    fileFilter: (req, file, next) => {
      if (allowedExtensions.test(file.originalname)) {
        next(null, true);
      } else {
        next(
          new BadRequestException(
            `Invalid file type. Allowed types: ${message}`,
          ) as any,
          false,
        );
      }
    },
    limits: { fileSize: maxFileSize },
    storage: diskStorage({
      destination: folderPath,
      filename: (req, file, next) => {
        next(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  };
}
