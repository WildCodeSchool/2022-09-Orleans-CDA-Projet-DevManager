import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameResourceDto } from './dto/create-game-resource.dto';
import { UpdateGameResourceDto } from './dto/update-game-resource.dto';
import { GameResource } from '../../entities/game-resource.entity';
import { Resource } from '../../entities/resource.entity';
import { Game } from 'src/entities';

@Injectable()
export class GameResourcesService {
  constructor(
    @InjectRepository(GameResource)
    private gameResourcesRepository: Repository<GameResource>,
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) {}

  async create(createGameResourceDto: CreateGameResourceDto) {
    const game = await this.gamesRepository
      .createQueryBuilder('game')
      .where('game.id = :id', { id: createGameResourceDto.gameId })
      .getOne();

    const resource = await this.resourcesRepository
      .createQueryBuilder('resource')
      .where('resource.id = :id', { id: createGameResourceDto.resourceId })
      .getOne();

    const errors: { errorGame?: string; errorResource?: string } = {};

    if (game && resource) {
      this.gameResourcesRepository.save({
        game: { id: createGameResourceDto.gameId },
        resource: { id: createGameResourceDto.resourceId },
        quantity: 1000,
      });

      return { status: 'ok' };
    } else {
      if (game === null)
        errors.errorGame =
          'There is no row with the id of table "game" you try to insert in the table "gameResource".';
      if (resource === null)
        errors.errorResource =
          'There is no row with the id of table "resource" you try to insert in the table "gameResource".';
      return errors;
    }
  }

  findAll() {
    return `This action returns all gameResources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameResource`;
  }

  update(id: number, updateGameResourceDto: UpdateGameResourceDto) {
    return `This action updates a #${id} gameResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameResource`;
  }
}
