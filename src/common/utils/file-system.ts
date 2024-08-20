import fs from 'fs';
import path from 'path';
import { ApiError } from '@/common/utils';

export const deleteFromLocalStorage = (filePath: string): void => {
  const fullPath = path.join(__dirname, '../../storage', filePath);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (error) {
      throw new ApiError(
        {
          ar: 'فشل في حذف الملف من التخزين المحلي',
          en: 'Failed to delete file from local storage',
        },
        500,
      );
    }
  }
};
