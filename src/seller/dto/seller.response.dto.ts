import { Expose } from 'class-transformer';

export class SellerResponseDto {
  @Expose()
  id: string;
  @Expose()
  fullName: string;
  @Expose()
  username: string;
  @Expose()
  email?: string;
  @Expose()
  phone: string;
  @Expose()
  nid: string;
  @Expose()
  nidImage?: string[];
  @Expose()
  address?: string;
  @Expose()
  storeName?: string;
  @Expose()
  isActive: boolean;
}
