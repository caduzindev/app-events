import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthServiceCustomer } from './customer/auth.service.customer';
import { LocalCustomerGuard } from './customer/guards/local.customer.guard';
import { AuthServiceInstitution } from './institution/auth.service.institution';
import { LocalInstitutionGuard } from './institution/guards/local.institution.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authServiceCustomer: AuthServiceCustomer,
    private authServiceInstitution: AuthServiceInstitution,
  ) {}
  @UseGuards(LocalCustomerGuard)
  @Post('login/customer')
  async loginCustomer(@Request() req) {
    return await this.authServiceCustomer.login(req.user);
  }

  @UseGuards(LocalInstitutionGuard)
  @Post('login/institution')
  async loginInstitution(@Request() req) {
    return await this.authServiceInstitution.login(req.user);
  }
}
