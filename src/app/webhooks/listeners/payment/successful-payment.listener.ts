import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CustomerService } from 'src/app/customer/customer.service';
import { EventService } from 'src/app/event/event.service';
import { TicketService } from 'src/app/ticket/ticket.service';
import { SuccessfulPaymentEvent } from '../../events/payment/successful-payment.event';

@Injectable()
export class SuccessfulPaymentListener {
  constructor(
    private ticketService: TicketService,
    private eventService: EventService,
    private customerService: CustomerService,
  ) {}
  @OnEvent('successful-payment-event')
  async handleSuccessfulPaymentEvent(event: SuccessfulPaymentEvent) {
    const infoEvent = await this.eventService.getEvent(event.event_id);
    const infoCustomer = await this.customerService.findOneById(
      event.customer_id,
    );

    await this.ticketService.createManyTicket(
      {
        event: infoEvent,
        customer: infoCustomer,
        value: event.value,
      },
      event.quantity,
    );

    const newTotTickets = infoEvent.tot_tickets - event.quantity;

    await this.eventService.updateEvent(event.event_id, {
      ...infoEvent,
      tot_tickets: newTotTickets,
    });
  }
}
