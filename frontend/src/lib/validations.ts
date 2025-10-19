import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Имя обязательно' })
    .max(100, { message: 'Имя должно быть меньше 100 символов' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Неверный формат email' })
    .max(255, { message: 'Email должен быть меньше 255 символов' }),
  phone: z
    .string()
    .trim()
    .max(20, { message: 'Телефон должен быть меньше 20 символов' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(1, { message: 'Сообщение обязательно' })
    .max(2000, { message: 'Сообщение должно быть меньше 2000 символов' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
