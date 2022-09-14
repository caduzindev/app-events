import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/request/create-customer-dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post('create')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<any> {
    return this.customerService.createCustomer(createCustomerDto);
  }
}
