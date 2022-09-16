import { Injectable } from '@nestjs/common';
import {
  Customer,
  PayGateway,
  Product,
} from 'src/app/payment/protocols/pay.gateway';
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

  async activateSellerAccountLink(account_id: string): Promise<string> {
    const accountLink = await this.getInstance().accountLinks.create({
      account: account_id,
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      type: 'account_onboarding',
    });

    return accountLink.url;
  }

  async createCheckoutMarketplaceLink(
    account_id: string,
    customer: Customer,
    products: Product[],
    percent: number,
  ): Promise<string> {
    let total_value = 0;
    const create_line_items = products.map((product) => {
      const convert_decimal = product.value * 100;
      total_value += convert_decimal * product.quantity;
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
          },
          unit_amount: product.value * 100,
        },
        quantity: product.quantity,
      };
    });
    const create_customer = (
      await this.getInstance().customers.create({
        name: customer.name,
        metadata: customer.metadata,
      })
    ).id;

    const session = await this.getInstance().checkout.sessions.create({
      line_items: create_line_items,
      customer: create_customer,
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      payment_intent_data: {
        application_fee_amount: total_value * percent,
        transfer_data: {
          destination: account_id,
        },
      },
    });

    return session.url;
  }
}
