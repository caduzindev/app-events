import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket';
import { TicketRepository } from './ticket.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketService, TicketRepository],
  controllers: [TicketController],
})
export class TicketModule {}
