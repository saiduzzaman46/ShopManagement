import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { IsNull, Repository } from 'typeorm';
import { Customer } from './entity/signup.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async updatePhoneNumber(id: number, newPhone: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('User not found');

    customer.phone = newPhone;
    return this.customerRepository.save(customer);
  }

  async getCustomerNullFullName(): Promise<Customer[] | null> {
    return this.customerRepository.find({
      where: { fullName: '' },
    });
  }

  async deleteCustomer(id: number): Promise<string> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return 'User deleted successfully';
  }
}
