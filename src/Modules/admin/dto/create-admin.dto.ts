
import { Role } from '@prisma/client';
import { IsString, IsEmail, IsOptional, IsDateString, MinLength, IsEnum } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsEnum(Role)
  role?: Role;  

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
