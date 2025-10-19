import React, { useState } from 'react';
import { api } from '../../services/api';

interface Props {
  onUpload: (fileName: string) => void;
}

export const UploadDesign: React.FC<Props> = ({ onUpload }) => {
  const [error, setError] = useState('');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError('Допустимы только файлы PNG или JPEG');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Файл слишком большой, максимум 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/constructor/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpload(res.data.fileName);
    } catch (err) {
      setError('Не удалось загрузить файл');
      console.error(err);
    }
  };
  return (
    <div className="upload-design">
      <label htmlFor="design-upload" className="sr-only">
        Загрузить дизайн торта
      </label>
      <input
        id="design-upload"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        aria-describedby="file-requirements"
        title="Выберите изображение дизайна торта"
      />
      {error && <p className="error" role="alert">{error}</p>}
      <p id="file-requirements" className="text-sm text-gray-600">
        Допустимые форматы: PNG, JPEG. Максимальный размер: 5MB
      </p>
    </div>
  );
};
