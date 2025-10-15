import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';

export const UploadDesign: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const designs = watch('designPhotos') || [];

  const onDrop = async (acceptedFiles: File[]) => {
    if (designs.length + acceptedFiles.length > 3) return; // Max 3
    const newUrls = [];
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('design', file);
      const res = await api.post('/constructor/upload-design', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      newUrls.push(res.data.url);
    }
    setValue('designPhotos', [...designs, ...newUrls]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true, accept: 'image/*' });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4 cursor-pointer">
      <input {...getInputProps()} />
      <p>Загрузите до 3 фото дизайна (перетащите или кликните)</p>
      <Button type="button">Загрузить</Button>
      {designs.length > 0 && <p>Загружено: {designs.length}/3</p>}
    </div>
  );
};
