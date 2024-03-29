import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { RoomsModule } from './rooms/rooms.module';
import { CharactersModule } from './characters/character.module';
import { ForgeModule } from './forge/forge.module';
import { ForgeProdModule } from './forge-prod/forge-prod.module';
import { ResourcesModule } from './resources/resources.module';
import { GameResourcesModule } from './game-resources/game-resources.module';
import { ResourcesUsedModule } from './resources-used/resources-used.module';
import { ResourcesProducedModule } from './resources-produced/resources-produced.module';
import { GameEventsModule } from './game-events/game-events.module';
import { EventsModule } from './events/events.module';
import { BonusMalusModule } from './bonus-malus/bonus-malus.module';
import { GameCharactersModule } from './game-characters/game-characters.module';
import { ImagesModule } from './images/images.module';
import entities from '../entities';
import { GameRoomsModule } from './game-rooms/game-rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        entities,
        synchronize: configService.get('DATABASE_SYNCHRONIZE') === 'true',
      }),
      inject: [ConfigService],
    }),
    GamesModule,
    UsersModule,
    RoomsModule,
    CharactersModule,
    // ForgeModule,
    ForgeProdModule,
    AuthModule,
    ResourcesModule,
    GameResourcesModule,
    ResourcesUsedModule,
    ResourcesProducedModule,
    GameEventsModule,
    EventsModule,
    GameCharactersModule,
    BonusMalusModule,
    GameCharactersModule,
    ImagesModule,
    GameRoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
