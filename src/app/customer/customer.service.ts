import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (await this.findOneByEmail(customer.email)) {
      throw new BadRequestException(`O email ${customer.email} já existe`);
    }

    if (await this.findOneByCpf(customer.cpf)) {
      throw new BadRequestException(`O cpf ${customer.cpf} já existe`);
    }

    customer.password = await hash(customer.password, 10);
    const newCustomer = await this.customerRepository.create(customer);
    return this.buildCustomer(newCustomer);
  }

  async findOneByEmail(email: string): Promise<Customer> {
    return await this.customerRepository.findOneByEmail(email);
  }

  async findOneByCpf(cpf: string): Promise<Customer> {
    return await this.customerRepository.findOneByCpf(cpf);
  }

  async findOneById(customer_id: number): Promise<Customer> {
    return await this.customerRepository.findOneById(customer_id);
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
