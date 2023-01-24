import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Character,
  Game,
  GameCharacter,
  GameRoom,
  Room,
  User,
  Resource,
  Event,
  IsBonusMalus,
  GameResource,
GameEvent,
} from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class ForgeService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
    @InjectRepository(GameResource)
    private gameResourcesRepository: Repository<GameResource>,
    @InjectRepository(GameRoom)
    private gameRoomsRepository: Repository<GameRoom>,
    @InjectRepository(GameCharacter)
    private gameCharactersRepository: Repository<GameCharacter>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(IsBonusMalus)
    private isBonusMalusRepository: Repository<IsBonusMalus>,
    @InjectRepository(GameEvent)
    private gameEventsRepository: Repository<GameEvent>,
  ) {}

  async create(): Promise<string> {
    const user1 = await this.usersRepository.save({
      username: 'XXdemonSlayer',
      email: 'john.doe@email.com',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$xIIZNxgDY6IMB8y6pKDFeg$evIcTxHMeyMp67wpQaRKTz65jygd3TQuuLPjp3d+vPQ',
    });

    const game1 = await this.gamesRepository.save({
      idUser: user1.id,
      companyName: 'Twitter',
      ceo: 'Elon Musk',
      location: 'Paris, France',
      idImage: 1,
    });

    const room1 = await this.roomsRepository.save({
      name: 'Open Space',
      description: 'Open Space Description',
      image: '/open_space.png',
      label: 'open_space',
      color: 'purple.900',
      price: 5000,
      isExpandable: true,
    });
    const room2 = await this.roomsRepository.save({
      name: 'Offices',
      description: 'Offices Description',
      image: '/offices.png',
      label: 'offices',
      color: 'turquoise.900',
      price: 7500,
      isExpandable: true,
    });
    const room3 = await this.roomsRepository.save({
      name: 'Break Room',
      description: 'Break Room Description',
      image: '/break_room.png',
      label: 'break_room',
      color: 'gold.900',
      price: 10000,
      isExpandable: false,
    });

    const character1 = await this.charactersRepository.save({
      name: 'Intern',
      description: 'Intern description',
      image: '/intern.png',
      price: 1,
      size: 1,
      idRoom: room1.id,
    });
    const character2 = await this.charactersRepository.save({
      name: 'Developer',
      description: 'Developer description',
      image: '/developer.png',
      price: 100,
      size: 5,
      idRoom: room1.id,
    });
    const character3 = await this.charactersRepository.save({
      name: 'Lead developer',
      description: 'Lead developer description',
      image: '/lead_dev.png',
      price: 1000,
      size: 15,
      idRoom: room1.id,
    });
    const character4 = await this.charactersRepository.save({
      name: 'Recruiter',
      description: 'Recruiter description',
      image: '/recruiter.png',
      price: 5000,
      size: 5,
      idRoom: room2.id,
    });
    const character5 = await this.charactersRepository.save({
      name: 'Salesman',
      description: 'Salesman description',
      image: '/salesman.png',
      price: 5000,
      size: 5,
      idRoom: room2.id,
    });
    const character6 = await this.charactersRepository.save({
      name: 'Delivery man',
      description: 'Delivery man description',
      image: '/delivery_man.png',
      price: 7500,
      size: 5,
      idRoom: room2.id,
    });

    await this.gameRoomsRepository.save({
      game: { id: game1.id },
      room: { id: room1.id },
      size: 40,
      totalSize: 110,
    });
    await this.gameRoomsRepository.save({
      game: { id: game1.id },
      room: { id: room2.id },
      size: 20,
      totalSize: 60,
    });
    await this.gameRoomsRepository.save({
      game: { id: game1.id },
      room: { id: room3.id },
      size: 51,
      totalSize: 80,
    });

    await this.gameCharactersRepository.save({
      game: { id: game1.id },
      room: { id: room1.id },
      character: { id: character1.id },
      size: 3,
    });
    await this.gameCharactersRepository.save({
      game: { id: game1.id },
      room: { id: room1.id },
      character: { id: character2.id },
      size: 3,
    });
    await this.gameCharactersRepository.save({
      game: { id: game1.id },
      room: { id: room1.id },
      character: { id: character3.id },
      size: 3,
    });
    await this.gameCharactersRepository.save({
      game: { id: game1.id },
      room: { id: room2.id },
      character: { id: character4.id },
      size: 3,
    });
    await this.gameCharactersRepository.save({
      game: { id: game1.id },
      room: { id: room2.id },
      character: { id: character5.id },
      size: 3,
    });
    await this.gameCharactersRepository.save({
      game: { id: game1.id },
      room: { id: room2.id },
      character: { id: character6.id },
      size: 3,
    });

    const event1 = await this.eventsRepository.save({
      name: 'Hackathon',
      description: 'Hackathon description',
      label: 'hackathon',
      image: '/hackathon.png',
      price: 1000,
      duration: 600,
      room: { id: room3.id },
    });
    const event2 = await this.eventsRepository.save({
      name: 'Talent Week',
      description: 'Talent Week description',
      label: 'talent_week',
      image: '/talent_week.png',
      price: 10000,
      duration: 1800,
      room: { id: room3.id },
    });
    const event3 = await this.eventsRepository.save({
      name: 'Job Dating',
      description: 'Job Dating description',
      label: 'job_dating',
      image: '/job_dating.png',
      price: 20000,
      duration: 1200,
      room: { id: room3.id },
    });

    const isBonus1 = await this.isBonusMalusRepository.save({
      name: 'Production +100%',
      type: 'production',
      label: 'interns_production_bonus',
      rate: 100,
      isBonus: true,
      event: { id: event1.id },
      character: { id: character1.id },
    });
    const isBonus2 = await this.isBonusMalusRepository.save({
      name: 'Price -50%',
      type: 'price',
      label: 'interns_price_bonus',
      rate: -50,
      isBonus: true,
      event: { id: event2.id },
      character: { id: character1.id },
    });
    const isBonus3 = await this.isBonusMalusRepository.save({
      name: 'Production -50%',
      type: 'production',
      label: 'developers_production_malus',
      rate: -50,
      isBonus: false,
      event: { id: event2.id },
      character: { id: character2.id },
    });
    const isBonus4 = await this.isBonusMalusRepository.save({
      name: 'Price -50%',
      type: 'price',
      label: 'developers_price_bonus',
      rate: -50,
      isBonus: true,
      event: { id: event3.id },
      character: { id: character2.id },
    });
    const isBonus5 = await this.isBonusMalusRepository.save({
      name: 'Production -50%',
      type: 'production',
      label: 'lead_developers_production_malus',
      rate: -50,
      isBonus: false,
      event: { id: event3.id },
      character: { id: character3.id },
    });

    const gameEvent1 = await this.gameEventsRepository.save({
      startDate: '',
      endDate: '',
      game: { id: game1.id },
      event: { id: event1.id },
    });
    const gameEvent2 = await this.gameEventsRepository.save({
      startDate: '',
      endDate: '',
      game: { id: game1.id },
      event: { id: event2.id },
    });
    const gameEvent3 = await this.gameEventsRepository.save({
      startDate: '',
      endDate: '',
      game: { id: game1.id },
      event: { id: event3.id },
    });

    const resource1 = await this.resourcesRepository.save({
      name: 'DevDollars',
      description: 'DevDollars Description',
      image: '/dollar.png',
      color: 'gold.200',
    });
    const resource2 = await this.resourcesRepository.save({
      name: 'Energic drinks',
      description: 'Energic drinks Description',
      image: '/soda.png',
      color: 'turquoise.200',
    });
    const resource3 = await this.resourcesRepository.save({
      name: 'Coffees',
      description: 'Coffees Description',
      image: '/coffee.png',
      color: 'brown.200',
    });
    const resource4 = await this.resourcesRepository.save({
      name: 'Contracts',
      description: 'Contracts Description',
      image: '/contract.png',
      color: 'blue.100',
    });
    const resource5 = await this.resourcesRepository.save({
      name: 'Delivery orders',
      description: 'Delivery orders Description',
      image: '/delivery_order.png',
      color: 'brown.500',
    });

    await this.gameResourcesRepository.save({
      game: { id: game1.id },
      resource: { id: resource1.id },
      quantity: 1257,
    });
    await this.gameResourcesRepository.save({
      game: { id: game1.id },
      resource: { id: resource2.id },
      quantity: 1951,
    });
    await this.gameResourcesRepository.save({
      game: { id: game1.id },
      resource: { id: resource3.id },
      quantity: 2752,
    });
    await this.gameResourcesRepository.save({
      game: { id: game1.id },
      resource: { id: resource4.id },
      quantity: 275,
    });
    await this.gameResourcesRepository.save({
      game: { id: game1.id },
      resource: { id: resource5.id },
      quantity: 25,
    });

    return 'OK';
  }
}
