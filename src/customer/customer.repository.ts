import { Injectable } from '@nestjs/common';
import { Customer } from './entities/customer';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomerRepository {
  constructor(private dataSource: DataSource) {}
  async create(customer: Partial<Customer>): Promise<Customer> {
    return await this.dataSource.getRepository(Customer).save(customer);
  }
  async findOneByEmail(email: string): Promise<Customer> {
    return await this.dataSource.getRepository(Customer).findOneBy({ email });
  }
}
