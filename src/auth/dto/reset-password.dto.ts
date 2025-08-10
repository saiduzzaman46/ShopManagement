import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Reset code must be 6 characters long' })
  resetCode: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^.{8,}$/, { message: 'Password must be at least 8 characters long' })
  newPassword: string;
}
