import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket';
import { TicketRepository } from './ticket.repository';
import { EventService } from '../event/event.service';
import { EventRepository } from '../event/event.repository';
import { PaymentService } from '../payment/payment.service';
import { CustomerService } from '../customer/customer.service';
import { CustomerRepository } from '../customer/customer.repository';
import { StripePayGateway } from 'src/infra/payment/stripe-pay-gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [
    TicketService,
    TicketRepository,
    EventService,
    EventRepository,
    PaymentService,
    CustomerService,
    CustomerRepository,
    StripePayGateway,
  ],
  controllers: [TicketController],
})
export class TicketModule {}
