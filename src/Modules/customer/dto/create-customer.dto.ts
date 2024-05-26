import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
