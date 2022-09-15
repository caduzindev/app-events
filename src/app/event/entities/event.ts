import { Institution } from 'src/app/institution/entities/institution';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Institution, (institution) => institution.events)
  @JoinColumn({ name: 'institution_id' })
  institution: Institution;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column()
  tot_tickets: number;

  @Column()
  location: string;

  @Column({ type: 'decimal' })
  input_value: number;
}
