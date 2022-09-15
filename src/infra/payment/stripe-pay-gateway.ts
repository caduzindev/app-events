import { Injectable } from '@nestjs/common';
import { PayGateway } from 'src/payment/protocols/pay.gateway';
import Stripe from 'stripe';

@Injectable()
export class StripePayGateway implements PayGateway {
  private stripeInstance: Stripe;
  private getInstance(): Stripe {
    if (this.stripeInstance) return this.stripeInstance;

    this.stripeInstance = new Stripe(
      'sk_test_51LhOuWJg677VM0Tjh5IPGFiZBrPH391EiAucNsA72TG2G5p4YrIdHnsdumd7SuGzHp8IVDsmG8Kt9rWe8wyc4Lpv00lEklWO0m',
      {
        apiVersion: '2022-08-01',
      },
    );

    return this.stripeInstance;
  }
  async createSellerAccount(email: string): Promise<string> {
    const account = await this.getInstance().accounts.create({
      type: 'express',
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'company',
    });

    return account.id;
  }
}
