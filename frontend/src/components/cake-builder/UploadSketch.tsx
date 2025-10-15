import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';

export const UploadSketch: React.FC = () => {
  const { setValue } = useFormContext();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('sketch', file);
    // Upload to /constructor/upload (implement in controller)
    const res = await api.post('/constructor/upload', formData);
    setValue('sketchUrl', res.data.url);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4">
      <input {...getInputProps()} />
      <p>Перетащите эскиз или кликните</p>
      <Button>Загрузить</Button>
    </div>
  );
};
