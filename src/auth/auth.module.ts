import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/customer/customer.module';
import { AuthServiceCustomer } from './customer/auth.service.customer';
import { LocalCustomerStrategy } from './customer/strategy/Local.customer.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [CustomerModule, PassportModule],
  providers: [AuthServiceCustomer, LocalCustomerStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
