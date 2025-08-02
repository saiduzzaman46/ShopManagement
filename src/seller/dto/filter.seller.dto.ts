import { IsOptional } from 'class-validator';

export class FilterSellerDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  fullName?: string;
}
