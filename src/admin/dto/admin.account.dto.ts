import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class AdminAccountDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^.{8,}$/, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsOptional() // <-- change this
  @IsString()
  role?: string;
}
