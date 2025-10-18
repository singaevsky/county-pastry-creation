import { Injectable, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class DesignUploadService {
  private allowedMime = ['image/png', 'image/jpeg'];
  private maxSize = 5 * 1024 * 1024; // 5MB

  async validateAndSave(file: Express.Multer.File, destFolder: string) {
    if (!this.allowedMime.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    if (file.size > this.maxSize) {
      throw new BadRequestException('File too large');
    }
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    const filePath = path.join(destFolder, filename);
    await fs.writeFile(filePath, file.buffer);
    return filename;
  }
}
