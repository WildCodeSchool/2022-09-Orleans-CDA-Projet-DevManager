import { GameResource } from './game-resource.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ResourceUsed } from './resource-used.entity';
import { ResourceProduced } from './resource-produced.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  description: string;

  @Column('varchar', { length: 50 })
  image: string;

  @Column('varchar', { length: 50 })
  color: string;

  @Column({ type: 'int', width: 3 })
  order: number;

  @OneToMany(() => GameResource, (gameResource) => gameResource.resource)
  gameResources: GameResource[];

  @OneToMany(() => ResourceUsed, (resourceUsed) => resourceUsed.resource)
  resourcesUsed: ResourceUsed[];

  @OneToMany(
    () => ResourceProduced,
    (resourceProduced) => resourceProduced.resource,
  )
  resourcesProduced: ResourceProduced[];
}
