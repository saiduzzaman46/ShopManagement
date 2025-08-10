import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../seller/product/entity/product.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  brandId: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  logo?: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
