import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/request/create-customer-dto';
import { Customer } from './entities/customer';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async createCustomer(customer: CreateCustomerDto): Promise<Customer> {
    return this.customerRepository.create(customer);
  }
}
