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
      setError('Only PNG or JPEG files allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large, max 5MB');
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
      setError('Upload failed');
      console.error(err);
    }
  };

  return (
    <div className="upload-design">
      <input type="file" accept="image/png, image/jpeg" onChange={handleChange} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};
