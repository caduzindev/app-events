import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtCustomerGuard } from '../auth/customer/guards/jwt.customer.guard';
import { JwtInstitutionGuard } from '../auth/institution/guards/jwt.institution.guard';
import { CustomerService } from '../customer/customer.service';
import {
  ExceedsTotalVacancies,
  NoVacancy,
} from '../event/entities/event.error';
import { EventService } from '../event/event.service';
import { PaymentService } from '../payment/payment.service';
import { BuyTicketDto } from './dto/request/buy.ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private ticketService: TicketService,
    private eventService: EventService,
    private paymentService: PaymentService,
    private customerService: CustomerService,
  ) { }
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

  @UseGuards(JwtCustomerGuard)
  @Post('customer/buy/:event')
  async buyTicket(
    @Request() req,
    @Param() params,
    @Body() buyTicketDto: BuyTicketDto,
  ): Promise<any> {
    const customer_id = req.user.id;
    const event_id = params.event;

    const infoEvent = await this.eventService.getEventToIntitution(event_id);

    try {
      this.eventService.validQuantityTicketRequested(
        buyTicketDto.quantity,
        infoEvent,
      );
    } catch (err) {
      if (err instanceof NoVacancy) throw new BadRequestException(err.message);
      if (err instanceof ExceedsTotalVacancies)
        throw new BadRequestException(err.message);
    }

    const infoCustomer = await this.customerService.findOneById(customer_id);
    const session = await this.paymentService.createCheckoutMarketplaceLink(
      infoEvent.institution.pay_id,
      {
        name: infoCustomer.name,
        metadata: { event_id, customer_id, quantity: buyTicketDto.quantity },
      },
      [
        {
          name: infoEvent.name,
          quantity: buyTicketDto.quantity,
          value: infoEvent.input_value,
        },
      ],
      0.1,
    );
    return {
      link: session,
    };
  }
}
