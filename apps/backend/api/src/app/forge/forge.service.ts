import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Character,
  Game,
  GameCharacter,
  GameRoom,
  Image,
  Room,
  User,
  Resource,
  Event,
  BonusMalus,
  GameResource,
  ResourceUsed,
  ResourceProduced,
  GameEvent,
} from '../../entities';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class ForgeService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
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
    @InjectRepository(BonusMalus)
    private bonusMalusRepository: Repository<BonusMalus>,
    @InjectRepository(ResourceUsed)
    private resourcesUsedRepository: Repository<ResourceUsed>,
    @InjectRepository(ResourceProduced)
    private resourcesProducedRepository: Repository<ResourceProduced>,
    @InjectRepository(GameEvent)
    private gameEventsRepository: Repository<GameEvent>,
  ) {}

  async create(): Promise<string> {
    // IMAGE

    const images = [
      {
        name: 'man1',
        description: 'Man with black hair and red shirt',
        category: 'profile',
      },
      {
        name: 'man2',
        description: 'Man with beard and yellow tank top',
        category: 'profile',
      },
      {
        name: 'man3',
        description: 'Young man with black hair and white t-shirt',
        category: 'profile',
      },
      {
        name: 'man4',
        description: 'Man with glasses and red bow knot',
        category: 'profile',
      },
      {
        name: 'man5',
        description: 'Man with yellow hair and tall neck',
        category: 'profile',
      },
      {
        name: 'man6',
        description: 'Man dressed like Santa Klaus',
        category: 'profile',
      },
      {
        name: 'man7',
        description: 'Man looking like the singer Stromae',
        category: 'profile',
      },
      {
        name: 'man8',
        description: 'Man with a crocodile costume',
        category: 'profile',
      },
      {
        name: 'man9',
        description: 'Man dressed as a joker',
        category: 'profile',
      },
      {
        name: 'man10',
        description: 'Cyber-man without neck',
        category: 'profile',
      },
      {
        name: 'woman1',
        description: 'Woman with red hair and blood drops',
        category: 'profile',
      },
      {
        name: 'woman2',
        description: 'Young woman dressed like a japanese student',
        category: 'profile',
      },
      {
        name: 'woman3',
        description: 'Woman dressed like Cleopatra',
        category: 'profile',
      },
      {
        name: 'woman4',
        description: 'Woman with antennae on her head',
        category: 'profile',
      },
      {
        name: 'woman5',
        description: 'Woman dressed like an elf',
        category: 'profile',
      },
      {
        name: 'woman6',
        description: 'Woman with red hair and a cap',
        category: 'profile',
      },
      {
        name: 'woman7',
        description: 'Woman with red hair and a blue shirt',
        category: 'profile',
      },
      {
        name: 'woman8',
        description: 'Woman with black hair and an orange t-shirt',
        category: 'profile',
      },
      {
        name: 'woman9',
        description: 'Woman with black hair and pink jacket',
        category: 'profile',
      },
      {
        name: 'woman10',
        description: 'Woman with two buns and glasses',
        category: 'profile',
      },
      {
        name: 'company1',
        description: 'Ordinary house',
        category: 'company',
      },
      {
        name: 'company2',
        description: 'Warehouse',
        category: 'company',
      },
      {
        name: 'company3',
        description: 'Old skyscraper',
        category: 'company',
      },
      {
        name: 'company4',
        description: 'Hospital with towers',
        category: 'company',
      },
      {
        name: 'company5',
        description: 'Museum',
        category: 'company',
      },
      {
        name: 'company6',
        description: 'Lighthouse',
        category: 'company',
      },
      {
        name: 'company7',
        description: 'Yellow bank',
        category: 'company',
      },
      {
        name: 'company8',
        description: 'Castle',
        category: 'company',
      },
      {
        name: 'company9',
        description: 'Modern skyscraper',
        category: 'company',
      },
      {
        name: 'company10',
        description: 'Embassy',
        category: 'company',
      },
    ];

    const imagesPromises = [];
    for (const { name, description, category } of images) {
      imagesPromises.push(
        this.imagesRepository.save({
          name,
          description,
          category,
        }),
      );
    }

    const [
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      image10,
      image11,
      image12,
      image13,
      image14,
      image15,
      image16,
      image17,
      image18,
      image19,
      image20,
      image21,
      image22,
      image23,
      image24,
      image25,
      image26,
      image27,
      image28,
      image29,
      image30,
    ] = await Promise.all(imagesPromises);

    // USER

    const users = [
      {
        username: 'user1',
        email: 'user1@email.com',
        password: 'password',
        imageId: image1.id,
      },
      {
        username: 'user2',
        email: 'user2@email.com',
        password: 'password',
        imageId: image2.id,
      },
      {
        username: 'user3',
        email: 'user3@email.com',
        password: 'password',
        imageId: image3.id,
      },
      {
        username: 'user4',
        email: 'user4@email.com',
        password: 'password',
        imageId: image4.id,
      },
      {
        username: 'user5',
        email: 'user5@email.com',
        password: 'password',
        imageId: image5.id,
      },
    ];

    const usersPromises = [];
    for (const { username, email, password, imageId } of users) {
      usersPromises.push(
        this.usersRepository.save({
          username,
          email,
          password: await argon2.hash(password),
          image: { id: imageId },
        }),
      );
    }

    const [user1, user2, user3, user4, user5] = await Promise.all(
      usersPromises,
    );

    // GAME

    const games = [
      {
        companyName: 'Twitter',
        ceo: 'Edith Piaf',
        location: 'Sydney, Australia',
        userId: user1.id,
        imageId: image21.id,
      },
      {
        companyName: 'AirBnB',
        ceo: 'Abraham Lincoln',
        location: 'Berlin, Germany',
        userId: user2.id,
        imageId: image22.id,
      },
      {
        companyName: 'Sodebo',
        ceo: 'Nelson Mandela',
        location: 'Houston, USA',
        userId: user3.id,
        imageId: image23.id,
      },
      {
        companyName: 'Thales',
        ceo: 'Marilyn Monroe',
        location: 'London, United-Kingdom',
        userId: user4.id,
        imageId: image24.id,
      },
      {
        companyName: 'Air France',
        ceo: 'Cyril Hanouna',
        location: 'Paris, France',
        userId: user5.id,
        imageId: image25.id,
      },
    ];

    const gamesPromises = [];
    for (const { companyName, ceo, location, userId, imageId } of games) {
      gamesPromises.push(
        this.gamesRepository.save({
          companyName,
          ceo,
          location,
          user: { id: userId },
          image: { id: imageId },
        }),
      );
    }

    const [game1, game2, game3, game4, game5] = await Promise.all(
      gamesPromises,
    );

    // ROOM

    const rooms = [
      {
        name: 'Open Space',
        description: 'Open Space description',
        image: '/open_space.png',
        label: 'open-space',
        color: 'purple',
        price: 5000,
        order: 1,
        isExpandable: true,
      },
      {
        name: 'Offices',
        description: 'Offices description',
        image: '/offices.png',
        label: 'offices',
        color: 'turquoise',
        price: 7500,
        order: 2,
        isExpandable: true,
      },
      {
        name: 'Break Room',
        description: 'Break Room description',
        image: '/break_room.png',
        label: 'break-room',
        color: 'gold',
        price: 10000,
        order: 3,
        isExpandable: false,
      },
    ];

    const roomsPromises = [];
    for (const {
      name,
      description,
      image,
      label,
      color,
      price,
      order,
      isExpandable,
    } of rooms) {
      roomsPromises.push(
        this.roomsRepository.save({
          name,
          description,
          image,
          label,
          color,
          price,
          order,
          isExpandable,
        }),
      );
    }

    const [openSpace, offices, breakRoom] = await Promise.all(roomsPromises);

    // CHARACTER

    const characters = [
      {
        name: 'Intern',
        description: 'Intern description',
        image: '/intern.png',
        price: 1,
        order: 1,
        size: 1,
        roomId: openSpace.id, // OpenSpace
      },
      {
        name: 'Developer',
        description: 'Developer description',
        image: '/developer.png',
        price: 100,
        order: 2,
        size: 5,
        roomId: openSpace.id, // OpenSpace
      },
      {
        name: 'Lead developer',
        description: 'Lead developer description',
        image: '/lead_dev.png',
        price: 1000,
        order: 3,
        size: 15,
        roomId: openSpace.id, // OpenSpace
      },
      {
        name: 'Recruiter',
        description: 'Recruiter description',
        image: '/recruiter.png',
        price: 5000,
        size: 5,
        order: 4,
        roomId: offices.id, // Offices
      },
      {
        name: 'Salesman',
        description: 'Salesman description',
        image: '/salesman.png',
        price: 5000,
        size: 5,
        order: 5,
        roomId: offices.id, // Offices
      },
      {
        name: 'Delivery man',
        description: 'Delivery man description',
        image: '/delivery_man.png',
        price: 7500,
        size: 5,
        order: 6,
        roomId: offices.id, // Offices
      },
    ];

    const charactersPromises = [];
    for (const {
      name,
      description,
      image,
      price,
      size,
      order,
      roomId,
    } of characters) {
      charactersPromises.push(
        this.charactersRepository.save({
          name,
          description,
          image,
          price,
          size,
          order,
          room: { id: roomId },
        }),
      );
    }

    const [intern, developer, leadDeveloper, recruiter, salesman, deliveryMan] =
      await Promise.all(charactersPromises);

    // EVENT

    const events = [
      {
        name: 'Hackathon',
        description: 'Hackathon description',
        label: 'hackathon',
        image: '/hackathon.png',
        price: 1000,
        order: 1,
        duration: 600,
        roomId: breakRoom.id, // Break room
      },
      {
        name: 'Talent Week',
        description: 'Talent Week description',
        label: 'talent_week',
        image: '/talent_week.png',
        price: 10000,
        order: 2,
        duration: 1800,
        roomId: breakRoom.id, // Break room
      },
      {
        name: 'Job Dating',
        description: 'Job Dating description',
        label: 'job_dating',
        image: '/job_dating.png',
        price: 20000,
        order: 3,
        duration: 1200,
        roomId: breakRoom.id, // Break room
      },
    ];

    const eventsPromises = [];
    for (const {
      name,
      description,
      label,
      image,
      price,
      order,
      duration,
      roomId,
    } of events) {
      eventsPromises.push(
        this.eventsRepository.save({
          name,
          description,
          label,
          image,
          price,
          order,
          duration,
          room: { id: roomId },
        }),
      );
    }

    const [hackathon, talentWeek, jobDating] = await Promise.all(
      eventsPromises,
    );

    // RESOURCE

    const resources = [
      {
        name: 'DevDollars',
        description: 'DevDollars Description',
        image: '/dollar.png',
        color: 'gold.200',
        order: 1,
      },
      {
        name: 'Coffees',
        description: 'Coffees Description',
        image: '/coffee.png',
        color: 'brown.200',
        order: 2,
      },
      {
        name: 'Energic drinks',
        description: 'Energic drinks Description',
        image: '/soda.png',
        color: 'turquoise.200',
        order: 3,
      },
      {
        name: 'Contracts',
        description: 'Contracts Description',
        image: '/contract.png',
        color: 'blue.100',
        order: 4,
      },
      {
        name: 'Delivery orders',
        description: 'Delivery orders Description',
        image: '/delivery_order.png',
        color: 'brown.500',
        order: 5,
      },
    ];

    const resourcesPromises = [];
    for (const { name, description, image, color, order } of resources) {
      resourcesPromises.push(
        this.resourcesRepository.save({
          name,
          description,
          image,
          color,
          order,
        }),
      );
    }

    const [devDollars, coffees, energyDrinks, contracts, deliveryOrders] =
      await Promise.all(resourcesPromises);

    // RESOURCE USED

    const resourcesUsed = [
      {
        quantity: 1,
        resourceId: energyDrinks.id, // Energy drinks
        characterId: leadDeveloper.id, // Lead developers
      },
      {
        quantity: 1,
        resourceId: coffees.id, // Coffees
        characterId: developer.id, // Developers
      },
      {
        quantity: 2,
        resourceId: coffees.id, // Coffees
        characterId: recruiter.id, // Recruiters
      },
      {
        quantity: 2,
        resourceId: coffees.id, // Coffees
        characterId: salesman.id, // Salesman
      },
      {
        quantity: 1,
        resourceId: contracts.id, // Contracts
        characterId: leadDeveloper.id, // Lead developers
      },
      {
        quantity: 1,
        resourceId: deliveryOrders.id, // Delivery orders
        characterId: deliveryMan.id, // Delivery man
      },
    ];

    const resourcesUsedPromises = [];
    for (const { quantity, resourceId, characterId } of resourcesUsed) {
      resourcesUsedPromises.push(
        this.resourcesUsedRepository.save({
          quantity,
          resource: { id: resourceId },
          character: { id: characterId },
        }),
      );
    }

    await Promise.all(resourcesUsedPromises);

    // RESOURCE PRODUCED

    const resourcesProduced = [
      {
        quantity: 100,
        resourceId: devDollars.id, // DevDollars
        characterId: developer.id, // Developers
      },
      {
        quantity: 150,
        resourceId: devDollars.id, // DevDollars
        characterId: leadDeveloper.id, // Lead developers
      },
      {
        quantity: 2,
        resourceId: energyDrinks.id, // Energy drinks
        characterId: deliveryMan.id, // Delivery man
      },
      {
        quantity: 2,
        resourceId: coffees.id, // Coffees
        characterId: intern.id, // Interns
      },
      {
        quantity: 2,
        resourceId: contracts.id, // Contracts
        characterId: salesman.id, // Salesman
      },
      {
        quantity: 1,
        resourceId: deliveryOrders.id, // Delivery orders
        characterId: recruiter.id, // Recruiters
      },
    ];

    const resourcesProducedPromises = [];
    for (const { quantity, resourceId, characterId } of resourcesProduced) {
      resourcesProducedPromises.push(
        this.resourcesProducedRepository.save({
          quantity,
          resource: { id: resourceId },
          character: { id: characterId },
        }),
      );
    }

    await Promise.all(resourcesProducedPromises);

    // GAME RESOURCE

    const gameResources = [
      {
        quantity: 1010,
        gameId: game1.id, // Game 1
        resourceId: devDollars.id, // DevDollars
      },
      {
        quantity: 0,
        gameId: game1.id, // Game 1
        resourceId: energyDrinks.id, // Energy drinks
      },
      {
        quantity: 0,
        gameId: game1.id, // Game 1
        resourceId: coffees.id, // Coffees
      },
      {
        quantity: 0,
        gameId: game1.id, // Game 1
        resourceId: contracts.id, // Contracts
      },
      {
        quantity: 0,
        gameId: game1.id, // Game 1
        resourceId: deliveryOrders.id, // Delivery orders
      },
      {
        quantity: 1010,
        gameId: game2.id, // Game 2
        resourceId: devDollars.id, // DevDollars
      },
      {
        quantity: 0,
        gameId: game2.id, // Game 2
        resourceId: energyDrinks.id, // Energy drinks
      },
      {
        quantity: 0,
        gameId: game2.id, // Game 2
        resourceId: coffees.id, // Coffees
      },
      {
        quantity: 0,
        gameId: game2.id, // Game 2
        resourceId: contracts.id, // Contracts
      },
      {
        quantity: 0,
        gameId: game2.id, // Game 2
        resourceId: deliveryOrders.id, // Delivery orders
      },
      {
        quantity: 1010,
        gameId: game3.id, // Game 3
        resourceId: devDollars.id, // DevDollars
      },
      {
        quantity: 0,
        gameId: game3.id, // Game 3
        resourceId: energyDrinks.id, // Energy drinks
      },
      {
        quantity: 0,
        gameId: game3.id, // Game 3
        resourceId: coffees.id, // Coffees
      },
      {
        quantity: 0,
        gameId: game3.id, // Game 3
        resourceId: contracts.id, // Contracts
      },
      {
        quantity: 0,
        gameId: game3.id, // Game 3
        resourceId: deliveryOrders.id, // Delivery orders
      },
      {
        quantity: 1010,
        gameId: game4.id, // Game 4
        resourceId: devDollars.id, // DevDollars
      },
      {
        quantity: 0,
        gameId: game4.id, // Game 4
        resourceId: energyDrinks.id, // Energy drinks
      },
      {
        quantity: 0,
        gameId: game4.id, // Game 4
        resourceId: coffees.id, // Coffees
      },
      {
        quantity: 0,
        gameId: game4.id, // Game 4
        resourceId: contracts.id, // Contracts
      },
      {
        quantity: 0,
        gameId: game4.id, // Game 4
        resourceId: deliveryOrders.id, // Delivery orders
      },
      {
        quantity: 1010,
        gameId: game5.id, // Game 5
        resourceId: devDollars.id, // DevDollars
      },
      {
        quantity: 0,
        gameId: game5.id, // Game 5
        resourceId: energyDrinks.id, // Energy drinks
      },
      {
        quantity: 0,
        gameId: game5.id, // Game 5
        resourceId: coffees.id, // Coffees
      },
      {
        quantity: 0,
        gameId: game5.id, // Game 5
        resourceId: contracts.id, // Contracts
      },
      {
        quantity: 0,
        gameId: game5.id, // Game 5
        resourceId: deliveryOrders.id, // Delivery orders
      },
    ];

    const gameResourcesPromises = [];
    for (const { quantity, gameId, resourceId } of gameResources) {
      resourcesPromises.push(
        this.gameResourcesRepository.save({
          quantity,
          game: { id: gameId },
          resource: { id: resourceId },
        }),
      );
    }

    await Promise.all(gameResourcesPromises);

    // GAME ROOM

    const gameRooms = [
      {
        gameId: game1.id, // Game 1
        roomId: openSpace.id, // OpenSpace
        size: 0,
        totalSize: 110,
      },
      {
        gameId: game1.id, // Game 1
        roomId: offices.id, // Offices
        size: 0,
        totalSize: 60,
      },
      {
        gameId: game1.id, // Game 1
        roomId: breakRoom.id, // Break room
        size: 0,
        totalSize: 80,
      },
      {
        gameId: game2.id, // Game 2
        roomId: openSpace.id, // OpenSpace
        size: 0,
        totalSize: 110,
      },
      {
        gameId: game2.id, // Game 2
        roomId: offices.id, // Offices
        size: 0,
        totalSize: 60,
      },
      {
        gameId: game2.id, // Game 2
        roomId: breakRoom.id, // Break room
        size: 0,
        totalSize: 80,
      },
      {
        gameId: game3.id, // Game 3
        roomId: openSpace.id, // OpenSpace
        size: 0,
        totalSize: 110,
      },
      {
        gameId: game3.id, // Game 3
        roomId: offices.id, // Offices
        size: 0,
        totalSize: 60,
      },
      {
        gameId: game3.id, // Game 3
        roomId: breakRoom.id, // Break room
        size: 0,
        totalSize: 80,
      },
      {
        gameId: game4.id, // Game 4
        roomId: openSpace.id, // OpenSpace
        size: 0,
        totalSize: 110,
      },
      {
        gameId: game4.id, // Game 4
        roomId: offices.id, // Offices
        size: 0,
        totalSize: 60,
      },
      {
        gameId: game4.id, // Game 4
        roomId: breakRoom.id, // Break room
        size: 0,
        totalSize: 80,
      },
      {
        gameId: game5.id, // Game 5
        roomId: openSpace.id, // OpenSpace
        size: 0,
        totalSize: 110,
      },
      {
        gameId: game5.id, // Game 5
        roomId: offices.id, // Offices
        size: 0,
        totalSize: 60,
      },
      {
        gameId: game5.id, // Game 5
        roomId: breakRoom.id, // Break room
        size: 0,
        totalSize: 80,
      },
    ];

    const gameRoomsPromises = [];
    for (const { gameId, roomId, size, totalSize } of gameRooms) {
      gameRoomsPromises.push(
        this.gameRoomsRepository.save({
          game: { id: gameId },
          room: { id: roomId },
          size,
          totalSize,
        }),
      );
    }

    await Promise.all(gameRoomsPromises);

    // GAME CHARACTER

    const gameCharacters = [
      {
        gameId: game1.id, // Game 1
        roomId: openSpace.id, // OpenSpace
        characterId: intern.id, // Interns
        quantity: 0,
      },
      {
        gameId: game1.id, // Game 1
        roomId: openSpace.id, // OpenSpace
        characterId: developer.id, // Developers
        quantity: 0,
      },
      {
        gameId: game1.id, // Game 1
        roomId: openSpace.id, // OpenSpace
        characterId: leadDeveloper.id, // Lead developers
        quantity: 0,
      },
      {
        gameId: game1.id, // Game 1
        roomId: offices.id, // Offices
        characterId: recruiter.id, // Recruiters
        quantity: 0,
      },
      {
        gameId: game1.id, // Game 1
        roomId: offices.id, // Offices
        characterId: salesman.id, // Salesman
        quantity: 0,
      },
      {
        gameId: game1.id, // Game 1
        roomId: offices.id, // Offices
        characterId: deliveryMan.id, // Delivery man
        quantity: 0,
      },
      {
        gameId: game2.id, // Game 2
        roomId: openSpace.id, // OpenSpace
        characterId: intern.id, // Interns
        quantity: 0,
      },
      {
        gameId: game2.id, // Game 2
        roomId: openSpace.id, // OpenSpace
        characterId: developer.id, // Developers
        quantity: 0,
      },
      {
        gameId: game2.id, // Game 2
        roomId: openSpace.id, // OpenSpace
        characterId: leadDeveloper.id, // Lead developers
        quantity: 0,
      },
      {
        gameId: game2.id, // Game 2
        roomId: offices.id, // Offices
        characterId: recruiter.id, // Recruiters
        quantity: 0,
      },
      {
        gameId: game2.id, // Game 2
        roomId: offices.id, // Offices
        characterId: salesman.id, // Salesman
        quantity: 0,
      },
      {
        gameId: game2.id, // Game 2
        roomId: offices.id, // Offices
        characterId: deliveryMan.id, // Delivery man
        quantity: 0,
      },
      {
        gameId: game3.id, // Game 3
        roomId: openSpace.id, // OpenSpace
        characterId: intern.id, // Interns
        quantity: 0,
      },
      {
        gameId: game3.id, // Game 3
        roomId: openSpace.id, // OpenSpace
        characterId: developer.id, // Developers
        quantity: 0,
      },
      {
        gameId: game3.id, // Game 3
        roomId: openSpace.id, // OpenSpace
        characterId: leadDeveloper.id, // Lead developers
        quantity: 0,
      },
      {
        gameId: game3.id, // Game 3
        roomId: offices.id, // Offices
        characterId: recruiter.id, // Recruiters
        quantity: 0,
      },
      {
        gameId: game3.id, // Game 3
        roomId: offices.id, // Offices
        characterId: salesman.id, // Salesman
        quantity: 0,
      },
      {
        gameId: game3.id, // Game 3
        roomId: offices.id, // Offices
        characterId: deliveryMan.id, // Delivery man
        quantity: 0,
      },
      {
        gameId: game4.id, // Game 4
        roomId: openSpace.id, // OpenSpace
        characterId: intern.id, // Interns
        quantity: 0,
      },
      {
        gameId: game4.id, // Game 4
        roomId: openSpace.id, // OpenSpace
        characterId: developer.id, // Developers
        quantity: 0,
      },
      {
        gameId: game4.id, // Game 4
        roomId: openSpace.id, // OpenSpace
        characterId: leadDeveloper.id, // Lead developers
        quantity: 0,
      },
      {
        gameId: game4.id, // Game 4
        roomId: offices.id, // Offices
        characterId: recruiter.id, // Recruiters
        quantity: 0,
      },
      {
        gameId: game4.id, // Game 4
        roomId: offices.id, // Offices
        characterId: salesman.id, // Salesman
        quantity: 0,
      },
      {
        gameId: game4.id, // Game 4
        roomId: offices.id, // Offices
        characterId: deliveryMan.id, // Delivery man
        quantity: 0,
      },
      {
        gameId: game5.id, // Game 5
        roomId: openSpace.id, // OpenSpace
        characterId: intern.id, // Interns
        quantity: 0,
      },
      {
        gameId: game5.id, // Game 5
        roomId: openSpace.id, // OpenSpace
        characterId: developer.id, // Developers
        quantity: 0,
      },
      {
        gameId: game5.id, // Game 5
        roomId: openSpace.id, // OpenSpace
        characterId: leadDeveloper.id, // Lead developers
        quantity: 0,
      },
      {
        gameId: game5.id, // Game 5
        roomId: offices.id, // Offices
        characterId: recruiter.id, // Recruiters
        quantity: 0,
      },
      {
        gameId: game5.id, // Game 5
        roomId: offices.id, // Offices
        characterId: salesman.id, // Salesman
        quantity: 0,
      },
      {
        gameId: game5.id, // Game 5
        roomId: offices.id, // Offices
        characterId: deliveryMan.id, // Delivery man
        quantity: 0,
      },
    ];

    const gameCharactersPromises = [];
    for (const { gameId, roomId, characterId, quantity } of gameCharacters) {
      gameCharactersPromises.push(
        this.gameCharactersRepository.save({
          game: { id: gameId },
          room: { id: roomId },
          character: { id: characterId },
          quantity,
        }),
      );
    }

    await Promise.all(gameCharactersPromises);

    // GAME EVENT

    const gameEvents = [
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: hackathon.id, // Hackathon
        gameId: game1.id, // Game 1
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: talentWeek.id, // Talent week
        gameId: game1.id, // Game 1
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: jobDating.id, // Job dating
        gameId: game1.id, // Game 1
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: hackathon.id, // Hackathon
        gameId: game2.id, // Game 2
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: talentWeek.id, // Talent week
        gameId: game2.id, // Game 2
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: jobDating.id, // Job dating
        gameId: game2.id, // Game 2
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: hackathon.id, // Hackathon
        gameId: game3.id, // Game 3
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: talentWeek.id, // Talent week
        gameId: game3.id, // Game 3
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: jobDating.id, // Job dating
        gameId: game3.id, // Game 3
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: hackathon.id, // Hackathon
        gameId: game4.id, // Game 4
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: talentWeek.id, // Talent week
        gameId: game4.id, // Game 4
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: jobDating.id, // Job dating
        gameId: game4.id, // Game 4
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: hackathon.id, // Hackathon
        gameId: game5.id, // Game 5
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: talentWeek.id, // Talent week
        gameId: game5.id, // Game 5
      },
      {
        startDate: '1970-01-01 00:00:00',
        endDate: '1970-01-01 00:00:00',
        eventId: jobDating.id, // Job dating
        gameId: game5.id, // Game 5
      },
    ];

    const gameEventsPromises = [];
    for (const { startDate, endDate, eventId, gameId } of gameEvents) {
      gameEventsPromises.push(
        this.gameEventsRepository.save({
          startDate,
          endDate,
          event: { id: eventId },
          game: { id: gameId },
        }),
      );
    }

    await Promise.all(gameEventsPromises);

    // BONUS MALUS

    const bonusMalus = [
      {
        name: 'Production +100%',
        type: 'production',
        label: 'interns_production_bonus',
        rate: 100,
        isBonus: true,
        eventId: hackathon.id, // Hackathon
        characterId: intern.id, // Interns
      },
      {
        name: 'Price -50%',
        type: 'price',
        label: 'interns_price_bonus',
        rate: -50,
        isBonus: true,
        eventId: talentWeek.id, // Talent week
        characterId: intern.id, // Interns
      },
      {
        name: 'Production -50%',
        type: 'production',
        label: 'developers_production_malus',
        rate: -50,
        isBonus: false,
        eventId: talentWeek.id, // Talent week
        characterId: developer.id, // Developers
      },
      {
        name: 'Price -50%',
        type: 'price',
        label: 'developers_price_bonus',
        rate: -50,
        isBonus: true,
        eventId: jobDating.id, // Job dating
        characterId: developer.id, // Developers
      },
      {
        name: 'Production -50%',
        type: 'production',
        label: 'lead_developers_production_malus',
        rate: -50,
        isBonus: false,
        eventId: jobDating.id, // Job dating
        characterId: leadDeveloper.id, // Lead developers
      },
    ];

    const bonusMalusPromises = [];
    for (const {
      name,
      type,
      label,
      rate,
      isBonus,
      eventId,
      characterId,
    } of bonusMalus) {
      bonusMalusPromises.push(
        this.bonusMalusRepository.save({
          name,
          type,
          label,
          rate,
          isBonus,
          event: { id: eventId },
          character: { id: characterId },
        }),
      );
    }

    await Promise.all(bonusMalusPromises);

    return 'OK';
  }
}
