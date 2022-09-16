import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtCustomerGuard } from '../auth/customer/guards/jwt.customer.guard';
import { JwtInstitutionGuard } from '../auth/institution/guards/jwt.institution.guard';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}
  @UseGuards(JwtInstitutionGuard)
  @Get('code/:code')
  async validTicket(@Param() params): Promise<any> {
    const code = params.code;
    return await this.ticketService.checkCpfMatchesTicket(code);
  }

  @UseGuards(JwtCustomerGuard)
  @Get('customer')
  async getCustomerTickets(@Request() req): Promise<any> {
    const customer_id = req.user.id;
    return await this.ticketService.getAllTicketsCustomer(customer_id);
  }

  @UseGuards(JwtCustomerGuard)
  @Get('customer/:ticket')
  async getCustomerTicket(@Request() req, @Param() params): Promise<any> {
    const cutomer_id = req.user.id;
    const ticket_id = params.ticket;

    return await this.ticketService.getTicketCustomer(ticket_id, cutomer_id);
  }
}
