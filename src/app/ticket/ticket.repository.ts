import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Ticket } from './entities/ticket';

@Injectable()
export class TicketRepository {
  constructor(private dataSource: DataSource) {}

  async getOneCustomerByTicketCode(code: string): Promise<Ticket> {
    return await this.dataSource.getRepository(Ticket).findOne({
      select: {
        customer: { cpf: true },
      },
      where: {
        code,
      },
      relations: {
        customer: true,
      },
    });
  }

  async getAllTicketsCustomer(customer_id: number): Promise<Ticket[]> {
    return await this.dataSource.getRepository(Ticket).find({
      where: {
        customer: { id: customer_id },
      },
    });
  }

  async getTicketCustomer(
    ticket_id: number,
    customer_id: number,
  ): Promise<Ticket> {
    return await this.dataSource.getRepository(Ticket).findOne({
      where: {
        id: ticket_id,
        customer: { id: customer_id },
      },
    });
  }

  async create(ticket: Partial<Ticket>): Promise<Ticket> {
    return await this.dataSource.getRepository(Ticket).save(ticket);
  }
}
