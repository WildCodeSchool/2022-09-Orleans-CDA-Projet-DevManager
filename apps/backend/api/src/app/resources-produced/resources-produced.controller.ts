import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResourcesProducedService } from './resources-produced.service';
import { CreateResourceProducedDto } from './dto/create-resource-produced.dto';
import { UpdateResourceProducedDto } from './dto/update-resource-produced.dto';

@Controller('resourcesProduced')
export class ResourcesProducedController {
  constructor(
    private readonly resourcesProducedService: ResourcesProducedService,
  ) {}

  @Post()
  create(@Body() createResourceProducedDto: CreateResourceProducedDto) {
    return this.resourcesProducedService.create(createResourceProducedDto);
  }

  @Get()
  findAll() {
    return this.resourcesProducedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesProducedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceProducedDto: UpdateResourceProducedDto,
  ) {
    return this.resourcesProducedService.update(+id, updateResourceProducedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesProducedService.remove(+id);
  }
}