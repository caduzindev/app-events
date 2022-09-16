import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/request/create-event-dto';
import { UpdateEventDto } from './dto/request/update-event-dto';
import { Event } from './entities/event';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}
  async createEvent(
    institution_id: number,
    createEventDto: CreateEventDto,
  ): Promise<Event> {
    return await this.eventRepository.create(institution_id, createEventDto);
  }

  async updateEvent(
    event_id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventRepository.udpate(event_id, updateEventDto);
  }

  async getEvent(event_id: number): Promise<Event> {
    return await this.eventRepository.findOneById(event_id);
  }

  async getEventToIntitution(event_id: number): Promise<Event> {
    return await this.eventRepository.getEventToInsitution(event_id);
  }

  async getAllEventInstitution(institution_id: number): Promise<Event[]> {
    return await this.eventRepository.getAllByInstitutionId(institution_id);
  }
}
