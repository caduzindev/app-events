import { Injectable } from '@nestjs/common';
import { Ticket } from './entities/ticket';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(private ticketRepository: TicketRepository) {}

  async checkCpfMatchesTicket(code: string): Promise<Ticket> {
    return await this.ticketRepository.getOneCustomerByTicketCode(code);
  }

  async getAllTicketsCustomer(customer_id: number): Promise<Ticket[]> {
    return await this.ticketRepository.getAllTicketsCustomer(customer_id);
  }

  async getTicketCustomer(
    ticket_id: number,
    customer_id: number,
  ): Promise<Ticket> {
    return await this.ticketRepository.getTicketCustomer(
      ticket_id,
      customer_id,
    );
  }

  async createManyTicket(
    ticket: Partial<Ticket>,
    quantity: number,
  ): Promise<void> {
    const value_per_ticket = ticket.value / quantity;
    for (let i = 1; i <= quantity; i++) {
      await this.createTicket({
        customer: ticket.customer,
        event: ticket.event,
        value: value_per_ticket,
      });
    }
  }

  async createTicket(ticket: Partial<Ticket>): Promise<Ticket> {
    return await this.ticketRepository.create(ticket);
  }
}
