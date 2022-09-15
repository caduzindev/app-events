import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer';

@Module({
  exports: [CustomerService],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomerModule {}
