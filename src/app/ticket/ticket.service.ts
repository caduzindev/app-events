import { Injectable } from '@nestjs/common';
import { Ticket } from './entities/ticket';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(private ticketRepository: TicketRepository) {}

  async checkCpfMatchesTicket(code: string): Promise<Ticket> {
    return await this.ticketRepository.getOneCustomerByTicketCode(code);
  }
}
