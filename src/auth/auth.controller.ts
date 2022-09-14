import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthServiceCustomer } from './customer/auth.service.customer';
import { LocalCustomerGuard } from './customer/guards/local.customer.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServiceCustomer: AuthServiceCustomer) {}
  @UseGuards(LocalCustomerGuard)
  @Post('login/customer')
  async loginCustomer(@Request() req) {
    return this.authServiceCustomer.login(req);
  }
}
