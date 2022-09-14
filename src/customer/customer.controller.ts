import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerDto } from './dto/request/create-customer-dto';

@Controller('customer')
export class CustomerController {
  @Post('create')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<any> {
    return createCustomerDto;
  }
}
