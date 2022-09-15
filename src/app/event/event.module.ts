import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  providers: [EventService, EventRepository],
  imports: [TypeOrmModule.forFeature([Event])],
})
export class EventModule {}
