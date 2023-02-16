import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GameEventsService } from './game-events.service';
import { CreateGameEventDto } from './dto/create-game-event.dto';
import { UpdateGameEventDto } from './dto/update-game-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('game-events')
export class GameEventsController {
  constructor(private readonly gameEventsService: GameEventsService) {}

  @Post()
  create(@Body() createGameEventDto: CreateGameEventDto) {
    return this.gameEventsService.create(createGameEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const gameId = req.signedCookies['game'];
    return this.gameEventsService.findAll(gameId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameEventsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameEventDto: UpdateGameEventDto,
  ) {
    return this.gameEventsService.update(+id, updateGameEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameEventsService.remove(+id);
  }

  @Post('/start/:id')
  startEvent(@Param('id') id: string, @Req() req) {
    const gameId = req.signedCookies['game'];
    return this.gameEventsService.start(+id, gameId);
  }
}
