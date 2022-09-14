import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalCustomerGuard } from './customer/guards/local.customer.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalCustomerGuard)
  @Post('login/customer')
  async loginCustomer(@Request() req) {
    return req.user;
  }
}
