import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtInstitutionGuard } from '../auth/institution/guards/jwt.institution.guard';
import { CreateEventDto } from './dto/request/create-event-dto';
import { UpdateEventDto } from './dto/request/update-event-dto';
import { Event } from './entities/event';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @UseGuards(JwtInstitutionGuard)
  @Post('create')
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @Request() req,
  ): Promise<any> {
    return await this.eventService.createEvent(req.user.id, createEventDto);
  }

  @UseGuards(JwtInstitutionGuard)
  @Post('update/:id')
  async udpateEvent(
    @Body() updateEventDto: UpdateEventDto,
    @Param() params,
  ): Promise<any> {
    const event_id = params.id;
    return await this.eventService.updateEvent(event_id, updateEventDto);
  }

  @Get('show/:id')
  async getEventInstitution(@Param() params): Promise<any> {
    const event_id = params.id;
    return await this.eventService.getEvent(event_id);
  }

  @Get()
  async getAllEvents(): Promise<Event[]> {
    return await this.eventService.getAllEventsToInstitutions();
  }

  @Get('search')
  async searchEvent(@Query('expression') expression: string): Promise<Event[]> {
    return await this.eventService.searchFilter(expression);
  }

  @UseGuards(JwtInstitutionGuard)
  @Get('institution')
  async getAllEventInstitution(@Request() req): Promise<any> {
    const institution_id = req.user.id;
    return await this.eventService.getAllEventInstitution(institution_id);
  }
}
