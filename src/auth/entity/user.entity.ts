import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seller } from 'src/seller/entity/create.seller.entity';
// import { Customer } from 'src/customers/customer.entity';
// import { Admin } from 'src/admins/admin.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'seller' | 'customer' | 'admin';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Seller, (seller) => seller.user)
  seller: Seller;

  //   @OneToOne(() => Customer, (customer) => customer.user)
  //   customer: Customer;

  //   @OneToOne(() => Admin, (admin) => admin.user)
  //   admin: Admin;
}
