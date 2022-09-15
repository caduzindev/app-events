import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/app/customer/customer.module';
import { AuthServiceCustomer } from './customer/auth.service.customer';
import { LocalCustomerStrategy } from './customer/strategy/Local.customer.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtCustomerStrategy } from './customer/strategy/jwt.customer.strategy';
import { LocalInstitutionStrategy } from './institution/strategy/local.institution.strategy';
import { JwtInstitutionStrategy } from './institution/strategy/jwt.institution.strategy';
import { AuthServiceInstitution } from './institution/auth.service.institution';
import { InstitutionModule } from 'src/app/institution/institution.module';

@Module({
  imports: [
    CustomerModule,
    InstitutionModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthServiceCustomer,
    AuthServiceInstitution,
    LocalCustomerStrategy,
    JwtCustomerStrategy,
    LocalInstitutionStrategy,
    JwtInstitutionStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
