import { Injectable } from '@nestjs/common';
import { StripePayGateway } from '../../infra/payment/stripe-pay-gateway';

@Injectable()
export class PaymentService {
  constructor(private payGateway: StripePayGateway) {}

  async createAccountSeller(email: string): Promise<string> {
    return await this.payGateway.createSellerAccount(email);
  }
}
