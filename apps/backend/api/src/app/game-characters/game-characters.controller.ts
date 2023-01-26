import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GameCharactersService } from './game-characters.service';
import { CreateGameCharacterDto } from './dto/create-game-character.dto';
import { UpdateGameCharacterDto } from './dto/update-game-character.dto';

@Controller('game-characters')
export class GameCharactersController {
  constructor(private readonly gameCharactersService: GameCharactersService) {}

  @Post()
  create(@Body() createGameCharacterDto: CreateGameCharacterDto) {
    return this.gameCharactersService.create(createGameCharacterDto);
  }

  @Get()
  findAll() {
    return this.gameCharactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameCharactersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameCharacterDto: UpdateGameCharacterDto,
  ) {
    return this.gameCharactersService.update(+id, updateGameCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameCharactersService.remove(+id);
  }
}