import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Event } from './entities/event';

@Injectable()
export class EventRepository {
  constructor(private dataSource: DataSource) {}
  async create(institution_id: number, event: Partial<Event>): Promise<Event> {
    return await this.dataSource.getRepository(Event).save({
      institution: {
        id: institution_id,
      },
      ...event,
    });
  }

  async udpate(event_id: number, event: Partial<Event>): Promise<Event> {
    await this.dataSource.getRepository(Event).update(event_id, event);

    return this.findOneById(event_id);
  }

  async findOneById(event_id: number): Promise<Event> {
    return await this.dataSource
      .getRepository(Event)
      .findOneBy({ id: event_id });
  }
}
