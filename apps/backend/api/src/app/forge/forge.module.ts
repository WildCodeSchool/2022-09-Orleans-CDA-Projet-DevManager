import { Module } from '@nestjs/common';
import { ForgeService } from './forge.service';
import { ForgeController } from './forge.controller';
import { Game } from '../games/entities/game.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../rooms/entities/room.entity';
import { Character } from '../characters/entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User, Room, Character])],
  controllers: [ForgeController],
  providers: [ForgeService],
})
export class ForgeModule {}