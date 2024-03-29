import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class IdDto {
  @IsNotEmpty()
  @IsInt({ message: 'Invalid user' })
  id: number;
}

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30, {
    message: 'The company name must be max 30 characters length',
  })
  companyName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30, {
    message: 'The CEO name must be between max 30 characters length',
  })
  ceo: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30, {
    message: 'The location must be between max 30 characters length',
  })
  location: string;

  @ValidateNested()
  @Type(() => IdDto)
  image: IdDto;

  @ValidateNested()
  @Type(() => IdDto)
  user: IdDto;
}
