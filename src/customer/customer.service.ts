import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create.customer.dto';

@Injectable()
export class CustomerService {
  createCustomer(createCustomerDto: CreateCustomerDto): CreateCustomerDto {
    return createCustomerDto;
  }
}
