import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../seller/product/entity/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
