import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {
  Character,
  Event,
  Game,
  GameCharacter,
  GameEvent,
  GameResource,
  GameRoom,
  Resource,
  Room,
} from '../../entities';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    @InjectRepository(GameRoom)
    private gameRoomsRepository: Repository<GameRoom>,
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
    @InjectRepository(GameResource)
    private gameResourcesRepository: Repository<GameResource>,
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    @InjectRepository(GameCharacter)
    private gameCharactersRepository: Repository<GameCharacter>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(GameEvent)
    private gameEventsRepository: Repository<GameEvent>,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = await this.gamesRepository.save(createGameDto);
    const rooms = await this.roomsRepository.find({ select: ['id'] });
    const resources = await this.resourcesRepository.find({ select: ['id'] });
    const characters = await this.charactersRepository.find({ select: ['id'] });
    const events = await this.eventsRepository.find({ select: ['id'] });

    const gameRoomsPromises = [];
    for (const room of rooms) {
      gameRoomsPromises.push(
        this.gameRoomsRepository.save({
          size: 0,
          totalSize: 100,
          game: { id: game.id },
          room: { id: room.id },
        }),
      );
    }

    const gameResourcesPromises = [];
    for (const resource of resources) {
      gameResourcesPromises.push(
        this.gameResourcesRepository.save({
          quantity: 0,
          game: { id: game.id },
          resource: { id: resource.id },
        }),
      );
    }

    const gameCharactersPromises = [];
    for (const character of characters) {
      gameCharactersPromises.push(
        this.gameCharactersRepository.save({
          quantity: 0,
          game: { id: game.id },
          character: { id: character.id },
        }),
      );
    }

    const gameEventsPromises = [];
    for (const event of events) {
      gameEventsPromises.push(
        this.gameEventsRepository.save({
          startDate: '1970-01-01 00:00',
          endDate: '1970-01-01 00:00',
          game: { id: game.id },
          event: { id: event.id },
        }),
      );
    }

    await Promise.all([
      ...gameRoomsPromises,
      ...gameResourcesPromises,
      ...gameCharactersPromises,
      ...gameEventsPromises,
    ]);
  }

  async findAll() {
    return this.gamesRepository.find();
  }

  async verifyGame(id: number) {
    return this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user', 'user')
      .where('user.id = :id', { id: id })
      .getCount();
  }

  async findOne(id: number): Promise<Game[]> {
    return this.gamesRepository.find({
      select: ['companyName', 'ceo', 'location'],
      where: { id },
    });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const update = await this.gamesRepository.update(id, updateGameDto);
    const game = await this.gamesRepository.findOne({
      where: { id },
      relations: ['image'],
    });

    return game;
  }

  async remove(id: number): Promise<void> {
    await this.gamesRepository.softDelete(id);
  }

  async findOneByUser(id: number) {
    return this.gamesRepository.findOne({
      select: ['id'],
      where: { user: { id } },
    });
  }
}
