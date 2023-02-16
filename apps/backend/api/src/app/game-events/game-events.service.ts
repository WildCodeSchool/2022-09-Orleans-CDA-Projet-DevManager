import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateGameEventDto } from './dto/create-game-event.dto';
import { UpdateGameEventDto } from './dto/update-game-event.dto';
import { GameEvent, Event, Game } from '../../entities';

@Injectable()
export class GameEventsService {
  constructor(
    @InjectRepository(GameEvent)
    private gameEventsRepository: Repository<GameEvent>,
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createGameEventDto: CreateGameEventDto) {
    const game = await this.gamesRepository
      .createQueryBuilder('game')
      .where('game.id = :id', { id: createGameEventDto.gameId })
      .getOne();

    const event = await this.eventsRepository
      .createQueryBuilder('event')
      .where('event.id = :id', { id: createGameEventDto.eventId })
      .getOne();

    const errors: { errorGame?: string; errorEvent?: string } = {};

    if (game && event) {
      await this.gameEventsRepository.save({
        game: { id: createGameEventDto.gameId },
        event: { id: createGameEventDto.eventId },
        quantity: 1000,
      });

      return { status: 'ok' };
    } else {
      if (game === null)
        errors.errorGame =
          'There is no row with the id of table "game" you try to insert in the table "gameEvent".';
      if (event === null)
        errors.errorEvent =
          'There is no row with the id of table "event" you try to insert in the table "gameEvent".';
      return errors;
    }
  }

  async findAll(gameId: number) {
    return this.gameEventsRepository
      .createQueryBuilder('gameEvent')
      .leftJoinAndSelect('gameEvent.game', 'game')
      .leftJoinAndSelect('gameEvent.event', 'event')
      .leftJoinAndSelect('event.room', 'room')
      .leftJoinAndSelect('event.bonusMalus', 'bonusMalus')
      .leftJoinAndSelect('bonusMalus.character', 'character')
      .where('game.id = :gameId', { gameId })
      .orderBy('event.order', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<GameEvent> {
    return this.gameEventsRepository
      .createQueryBuilder('gameEvent')
      .leftJoinAndSelect('gameEvent.game', 'game')
      .leftJoinAndSelect('gameEvent.event', 'event')
      .leftJoinAndSelect('event.room', 'room')
      .leftJoinAndSelect('event.bonusMalus', 'bonusMalus')
      .leftJoinAndSelect('bonusMalus.character', 'character')
      .where('gameEvent.id = :id', { id })
      .getOne();
  }

  async update(
    id: number,
    updateGameEventDto: UpdateGameEventDto,
  ): Promise<UpdateResult> {
    console.log('updateGameEventDto', updateGameEventDto);
    return this.gameEventsRepository.update(id, updateGameEventDto);
  }

  async remove(id: number): Promise<void> {
    await this.gameEventsRepository.delete(id);
  }

  async start(id: number, gameId: number) {
    const gameEvent = await this.gameEventsRepository
      .createQueryBuilder('gameEvent')
      .leftJoinAndSelect('gameEvent.game', 'game')
      .leftJoinAndSelect('gameEvent.event', 'event')
      .leftJoinAndSelect('event.room', 'room')
      .leftJoinAndSelect('event.bonusMalus', 'bonusMalus')
      .leftJoinAndSelect('bonusMalus.character', 'character')
      .where('gameEvent.event.id = :id', { id })
      .andWhere('gameEvent.gameId = :gameId', { gameId })
      .getOne();

    console.log('event duration', gameEvent.event.duration);
    console.log('event id', id);

    const startDate = new Date().toISOString();
    const actualDate = new Date();
    actualDate.setMinutes(
      actualDate.getMinutes() + gameEvent.event.duration / 60,
    );
    const endDate = actualDate.toISOString();
    console.log('start date', startDate);
    console.log('end date', endDate);
    console.log('---------------------------------------------');

    return { success: true };
  }
}
