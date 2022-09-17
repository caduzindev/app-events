import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/request/create-event-dto';
import { UpdateEventDto } from './dto/request/update-event-dto';
import { Event } from './entities/event';
import { ExceedsTotalVacancies, NoVacancy } from './entities/event.error';
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

  validQuantityTicketRequested(quantity: number, event: Partial<Event>): void {
    if (event.tot_tickets == 0)
      throw new NoVacancy('Não há mais vagas para este evento');
    if (event.tot_tickets < quantity)
      throw new ExceedsTotalVacancies(
        `A quantidade pedida excede o total de ${event.tot_tickets} vagdas do evento`,
      );
  }
}
