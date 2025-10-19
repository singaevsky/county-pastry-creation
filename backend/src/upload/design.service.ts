// backend/src/upload/design.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DesignUploadService {
  private readonly uploadDir = path.join(__dirname, '../../uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) fs.mkdirSync(this.uploadDir, { recursive: true });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const filePath = path.join(this.uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${file.originalname}`; // относительный путь
  }

  async validateAndSave(file: Express.Multer.File, dest: string): Promise<string> {
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Invalid file type');
    }
    const filePath = path.join(this.uploadDir, dest || file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${filePath}`;
  }
}
