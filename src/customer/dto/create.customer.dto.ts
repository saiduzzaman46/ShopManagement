import {
  IsEmail,
  Matches,
  IsNotEmpty,
  MinLength,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/@aiub\.edu$/, { message: 'Email must be from aiub.edu domain' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string;

  @IsNotEmpty()
  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  gender: string;

  @IsNotEmpty()
  @IsNumberString({}, { message: 'Phone number must contain only numbers' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profilePic?: string;
}
