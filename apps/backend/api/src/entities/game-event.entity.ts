import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Game } from './game.entity';
import { Event } from './event.entity';

@Entity()
export class GameEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  startDate: string;

  @Column({ type: 'datetime' })
  endDate: string;

  @ManyToOne(() => Event, (event) => event.gameEvents)
  event: Event;

  @ManyToOne(() => Game, (game) => game.gameCharacters)
  game: Game;
}
