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
}
