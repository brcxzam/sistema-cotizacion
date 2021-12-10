import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { MongoExceptionFilter } from 'src/utils/mongo-exception.filter';
import { ValidationErrorFilter } from 'src/utils/validation-error.filter';
import { PlazoDto } from './plazo.dto';
import { Plazo } from './plazo.schema';
import { PlazosService } from './plazos.service';

@Controller('plazos')
@UseFilters(MongoExceptionFilter, ValidationErrorFilter)
export class PlazosController {
  constructor(private readonly plazosService: PlazosService) {}

  @Post()
  async name(@Body() plazoDto: PlazoDto): Promise<Plazo> {
    return this.plazosService.create(plazoDto);
  }

  @Get()
  async findAll(): Promise<Plazo[]> {
    return this.plazosService.findAll();
  }

  @Put(':plazo')
  async update(
    @Param() plazoObj: { plazo: string },
    @Body() plazoDto: PlazoDto,
  ): Promise<Plazo> {
    const { plazo } = plazoObj;
    return this.plazosService.update(Number(plazo), plazoDto);
  }

  @Delete(':plazo')
  async remove(@Param() plazoObj: { plazo: string }): Promise<Plazo> {
    const { plazo } = plazoObj;
    return this.plazosService.remove(Number(plazo));
  }
}
