import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { DataSource, ILike } from 'typeorm';
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
    return await this.dataSource.getRepository(Event).findOne({
      select: {
        institution: {
          id: true,
          name: true,
          email: true,
          cnpj: true,
        },
      },
      relations: {
        institution: true,
      },
      where: {
        id: event_id,
      },
    });
  }

  async getAllByInstitutionId(institution_id: number): Promise<Event[]> {
    return await this.dataSource.getRepository(Event).find({
      where: {
        institution: { id: institution_id },
      },
    });
  }

  async getEventToInsitution(event_id: number): Promise<Event> {
    return await this.dataSource.getRepository(Event).findOne({
      where: {
        id: event_id,
      },
      relations: {
        institution: true,
      },
    });
  }

  async getAllEventsToInstitutions(): Promise<Event[]> {
    return await this.dataSource.getRepository(Event).find({
      select: {
        institution: {
          id: true,
          email: true,
          cnpj: true,
        },
      },
      relations: {
        institution: true,
      },
    });
  }

  async filterByExpression(expression: string): Promise<Event[]> {
    return await this.dataSource.getRepository(Event).find({
      where: [
        { name: ILike(`%${expression}%`) },
        { description: ILike(`%${expression}%`) },
        { location: ILike(`%${expression}%`) },
      ],
    });
  }
}
