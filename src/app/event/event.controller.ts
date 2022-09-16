import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtInstitutionGuard } from '../auth/institution/guards/jwt.institution.guard';
import { CreateEventDto } from './dto/request/create-event-dto';
import { UpdateEventDto } from './dto/request/update-event-dto';
import { EventService } from './event.service';

@UseGuards(JwtInstitutionGuard)
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @Post('create')
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @Request() req,
  ): Promise<any> {
    return await this.eventService.createEvent(req.user.id, createEventDto);
  }

  @Post('update/:id')
  async udpateEvent(
    @Body() updateEventDto: UpdateEventDto,
    @Param() params,
  ): Promise<any> {
    const event_id = params.id;
    return await this.eventService.updateEvent(event_id, updateEventDto);
  }

  @Get('show/:id')
  async getEvent(@Param() params): Promise<any> {
    const event_id = params.id;
    return await this.eventService.getEvent(event_id);
  }

  @Get('institution')
  async getAllEvent(@Request() req): Promise<any> {
    const institution_id = req.user.id;
    return await this.eventService.getAllEventInstitution(institution_id);
  }
}
