// backend/src/upload/design.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

@Injectable()
export class DesignUploadService {
  private readonly basePath = path.resolve(__dirname, '../../../uploads');

  async validateAndSave(file: Express.Multer.File, dest: string): Promise<string> {
    if (!file) throw new BadRequestException('No file provided');
    if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    const dir = path.join(this.basePath, dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, Date.now() + '_' + file.originalname);
    await util.promisify(fs.writeFile)(filePath, file.buffer);

    // возвращаем относительный путь для сохранения в БД
    return path.relative(this.basePath, filePath);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return this.validateAndSave(file, 'constructor');
  }
}
