import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsEnum,
  Min,
  MaxLength,
} from 'class-validator';

enum ProductStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class CreateProductDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  tags?: string;
}
