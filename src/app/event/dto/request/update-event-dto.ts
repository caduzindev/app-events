import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  start_date: string;

  @IsString()
  @IsOptional()
  end_date: string;

  @IsNumber()
  @IsOptional()
  tot_tickets: number;

  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  input_value: number;
}
