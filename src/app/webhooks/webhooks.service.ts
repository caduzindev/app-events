import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentService } from '../payment/payment.service';
import { SuccessfulPaymentEvent } from './events/payment/successful-payment.event';

@Injectable()
export class WebhooksService {
  constructor(
    private paymentService: PaymentService,
    private eventEmitter: EventEmitter2,
  ) {}
  async emitStipeEvent(body: string | Buffer, sig: string) {
    const stipeEvent = await this.paymentService.parseEvent(
      body,
      sig,
      'whsec_6c6b298dd5275b226096909a32bb08df9464a63067d91dae35421443a5b97185',
    );
    switch (stipeEvent.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = stipeEvent.data.object;
        const customer = await this.paymentService.getCustomerCheckout(
          paymentIntent.customer,
        );

        const { customer_id, event_id, quantity } = customer.metadata;

        const successfulPaymentEvent = new SuccessfulPaymentEvent();
        successfulPaymentEvent.customer_id = customer_id;
        successfulPaymentEvent.event_id = event_id;
        successfulPaymentEvent.quantity = quantity;
        successfulPaymentEvent.value = paymentIntent.amount / 100;

        this.eventEmitter.emit(
          'successful-payment-event',
          successfulPaymentEvent,
        );
        break;
    }
  }
}
