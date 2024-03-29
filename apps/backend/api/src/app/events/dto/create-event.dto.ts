import { IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  label: string;

  @IsString()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  duration: number;

  @IsNumber()
  roomId: number;
}
