import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';

enum Role {
  CLIENT = 'client',
  ADMIN = 'admin',
  MANAGER = 'manager',
  BAKER = 'baker',
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
