import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/request/create-customer-dto';
import { Customer } from './entities/customer';
import { hash } from 'bcrypt';
@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async createCustomer(
    customer: CreateCustomerDto,
  ): Promise<Partial<Customer>> {
    customer.password = await hash(customer.password, 10);
    const newCustomer = await this.customerRepository.create(customer);
    return this.buildCustomer(newCustomer);
  }

  async findOneByEmail(email: string): Promise<Customer> {
    return await this.customerRepository.findOneByEmail(email);
  }

  buildCustomer(customer: Customer): Partial<Customer> {
    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      cpf: customer.cpf,
    };
  }
}
