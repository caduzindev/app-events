import { Injectable } from '@nestjs/common';
import { StripePayGateway } from '../../infra/payment/stripe-pay-gateway';
import { Customer, Product } from './protocols/pay.gateway';

@Injectable()
export class PaymentService {
  constructor(private payGateway: StripePayGateway) {}

  async createAccountSeller(email: string): Promise<string> {
    return await this.payGateway.createSellerAccount(email);
  }

  async activateSellerAccountLink(account_id: string): Promise<string> {
    return await this.payGateway.activateSellerAccountLink(account_id);
  }

  async createCheckoutMarketplaceLink(
    account_id: string,
    customer: Customer,
    products: Product[],
    percent: number,
  ): Promise<string> {
    return await this.payGateway.createCheckoutMarketplaceLink(
      account_id,
      customer,
      products,
      percent,
    );
  }

  parseEvent(body: string | Buffer, sig: string, secret: string): any {
    return this.payGateway.parseEvent(body, sig, secret);
  }

  async getCustomerCheckout(customer: string): Promise<any> {
    return await this.payGateway.getCustomerCheckout(customer);
  }
}
