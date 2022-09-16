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
}
