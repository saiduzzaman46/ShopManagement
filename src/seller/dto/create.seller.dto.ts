import {
  IsString,
  IsNotEmpty,
  Matches,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabets' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/\.xyz$/, { message: 'Email must end with .xyz' })
  email: string;

  @IsString()
  @Matches(/^\d{10}$|^\d{13}$/, {
    message: 'NID must be exactly 10 or 13 numbers',
  })
  nid: string;

  @IsString()
  @IsOptional()
  nidImage?: string[];

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?\d{11,13}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  storeName?: string;
}
