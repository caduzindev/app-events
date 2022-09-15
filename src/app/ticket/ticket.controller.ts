import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
}
