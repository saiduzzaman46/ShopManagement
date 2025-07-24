import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn()
  productId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column('double precision')
  price: number;

  @Column()
  quantity: number;

  @Column()
  categoryId: string;

  @Column('text', { array: true, nullable: true })
  images?: string[];

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status?: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  tags?: string;
}
