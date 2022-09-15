import { Ticket } from 'src/app/ticket/entities/ticket';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}
