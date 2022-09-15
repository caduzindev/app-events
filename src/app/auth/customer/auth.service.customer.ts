import { CustomerService } from 'src/app/customer/customer.service';
import { AuthService } from '../auth.service.interface';
import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceCustomer implements AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const customer = await this.customerService.findOneByEmail(email);
    if (!customer) return null;

    const isValidPass = await compare(password, customer.password);
    if (!isValidPass) return null;

    return this.customerService.buildCustomer(customer);
  }

  async login(payload: any) {
    return {
      access_token: this.jwtService.sign({ id: payload.id }),
    };
  }
}
