import { Event } from 'src/app/event/entities/event';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('institution')
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cnpj: string;

  @Column()
  pay_id: string;

  @OneToMany(() => Event, (event) => event.institution)
  events: Event[];
}
