// src/common/interceptors/file-cleanup.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileCleanupInterceptor implements NestInterceptor {
  constructor(private readonly uploadDir: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    let uploadedFiles: Express.Multer.File[] = [];

    if (Array.isArray(request.files)) {
      uploadedFiles = request.files;
    } else if (
      request.file &&
      typeof request.file === 'object' &&
      'filename' in request.file
    ) {
      uploadedFiles = [request.file];
    } else if (
      request.files &&
      typeof request.files === 'object' &&
      !Array.isArray(request.files)
    ) {
      for (const key in request.files) {
        if (Array.isArray(request.files[key])) {
          uploadedFiles.push(...request.files[key]);
        }
      }
    }

    const uploadedFilenames = uploadedFiles.map((file) => file.filename);

    return next.handle().pipe(
      tap(() => {}),

      catchError((err) => {
        uploadedFilenames.forEach((filename) => {
          const filePath = path.join(this.uploadDir, filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted uploaded file due to error: ${filePath}`);
          }
        });
        return throwError(() => err);
      }),
    );
  }
}
