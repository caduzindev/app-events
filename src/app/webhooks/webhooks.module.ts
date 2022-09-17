import { Module } from '@nestjs/common';
import { StripePayGateway } from 'src/infra/payment/stripe-pay-gateway';
import { CustomerRepository } from '../customer/customer.repository';
import { CustomerService } from '../customer/customer.service';
import { EventRepository } from '../event/event.repository';
import { EventService } from '../event/event.service';
import { PaymentService } from '../payment/payment.service';
import { TicketRepository } from '../ticket/ticket.repository';
import { TicketService } from '../ticket/ticket.service';
import { SuccessfulPaymentListener } from './listeners/payment/successful-payment.listener';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  controllers: [WebhooksController],
  providers: [
    WebhooksService,
    PaymentService,
    CustomerService,
    CustomerRepository,
    EventService,
    EventRepository,
    TicketService,
    TicketRepository,
    StripePayGateway,
    SuccessfulPaymentListener,
  ],
})
export class WebhooksModule {}
