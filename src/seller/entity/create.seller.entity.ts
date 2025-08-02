import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/entity/product.entity';
import { Exclude } from 'class-transformer';

@Entity('sellers')
export class Seller {
  @PrimaryColumn()
  id: string;

  @Column({ length: 150 })
  fullName: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  nid: string;

  @Column('simple-array', { nullable: true })
  nidImage?: string[];

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  storeName?: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      const timestamp = Date.now().toString().substring(6);
      const random = Math.random().toString(36).substring(2, 10);
      this.id = `${timestamp}${random}`;
    }
  }
}
