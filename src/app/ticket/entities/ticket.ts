import { Customer } from 'src/app/customer/entities/customer';
import { Event } from 'src/app/event/entities/event';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ticket')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ type: 'decimal' })
  value: number;

  @ManyToOne(() => Event, (event) => event.tickets)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => Customer, (customer) => customer.tickets)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
