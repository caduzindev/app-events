import { CustomerService } from 'src/customer/customer.service';
import { AuthService } from '../auth.service.interface';
import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServiceCustomer implements AuthService {
  constructor(private customerService: CustomerService) {}

  async validate(email: string, password: string): Promise<any> {
    const customer = await this.customerService.findOneByEmail(email);
    if (!customer) return null;

    const isValidPass = await compare(password, customer.password);
    if (!isValidPass) return null;

    return this.customerService.buildCustomer(customer);
  }
}
