import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthServiceCustomer } from '../auth.service.customer';

@Injectable()
export class LocalCustomerStrategy extends PassportStrategy(
  Strategy,
  'customer-local',
) {
  constructor(private authServiceCustomer: AuthServiceCustomer) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    const customer = await this.authServiceCustomer.validate(
      username,
      password,
    );
    if (!customer) throw new UnauthorizedException();

    return customer;
  }
}
