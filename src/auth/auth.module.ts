import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/customer/customer.module';
import { AuthServiceCustomer } from './customer/auth.service.customer';
import { LocalCustomerStrategy } from './customer/strategy/Local.customer.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtCustomerStrategy } from './customer/strategy/jwt.customer.strategy';

@Module({
  imports: [
    CustomerModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthServiceCustomer, LocalCustomerStrategy, JwtCustomerStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
