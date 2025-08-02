import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BeforeInsert } from 'typeorm';
import { Seller } from 'src/seller/entity/create.seller.entity';

@Entity('products')
export class Product {
  @PrimaryColumn()
  productId: string;

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

  @ManyToOne(() => Seller, (seller) => seller.products, { onDelete: 'CASCADE' })
  seller: Seller;

  @BeforeInsert()
  generateId() {
    if (!this.productId) {
      const timestamp = Date.now().toString().substring(6);
      const random = Math.random().toString(36).substring(2, 10);
      this.productId = `${timestamp}${random}`;
    }
  }
}
