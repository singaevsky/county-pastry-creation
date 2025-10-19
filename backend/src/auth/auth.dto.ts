import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';

enum Role {
  CLIENT = 'client',
  BAKER = 'baker',
  SALES_MANAGER = 'sales_manager',
  LOGISTICS_MANAGER = 'logistics_manager',
  ADMIN = 'admin',
}

export class RegisterDto {
  /**
   * Email для регистрации
   */
  @IsEmail()
  email: string;

  /**
   * Пароль (минимум 6 символов)
   */
  @MinLength(6)
  @IsString()
  password: string;

  /**
   * Роль пользователя
   */
  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  /**
   * Email для входа
   */
  @IsEmail()
  email: string;

  /**
   * Пароль
   */
  @IsString()
  password: string;
}
