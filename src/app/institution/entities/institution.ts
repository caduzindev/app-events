import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
