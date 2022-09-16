import { IsNotEmpty, IsNumber } from 'class-validator';

export class BuyTicketDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
