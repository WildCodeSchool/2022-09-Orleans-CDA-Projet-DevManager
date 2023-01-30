import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../../entities/image.entity';
import { Repository } from 'typeorm';
// import { CreateImageDto } from './dto/create-image.dto';
// import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}
  findAllByCategory(category: string) {
    return this.imagesRepository.findBy({ category });
  }
  // create(createImageDto: CreateImageDto) {
  //   return 'This action adds a new image';
  // }

  // findAll() {
  //   return `This action returns all images`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} image`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} image`;
  // }
}