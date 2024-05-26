import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  photo?: string;
}

