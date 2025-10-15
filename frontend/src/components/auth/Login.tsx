import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth'; // Assume hook for token storage

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });
  const { setToken } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post('/auth/login', data);
      setToken(res.data.accessToken);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('email')} placeholder="Email" />
      <Input {...register('password')} type="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
};
