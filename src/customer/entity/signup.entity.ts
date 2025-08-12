import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryColumn()
  id: number;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(10000 + Math.random() * 90000);
  }

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  gender: 'male' | 'female';

  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  profilePic?: string;
}
