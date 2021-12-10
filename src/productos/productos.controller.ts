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
import { ProductoDto } from './producto.dto';
import { ProductosService } from './productos.service';
import { Producto } from './producto.schema';

@Controller('productos')
@UseFilters(MongoExceptionFilter, ValidationErrorFilter)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(@Body() productoDto: ProductoDto): Promise<Producto> {
    return this.productosService.create(productoDto);
  }

  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productosService.findAll();
  }

  @Get(':search')
  async findBy(@Param() searchObj: { search: string }): Promise<Producto[]> {
    const { search } = searchObj;
    if (isNaN(Number(search))) {
      return this.productosService.findByDesc(search);
    } else {
      return this.productosService.findBySKU(Number(search));
    }
  }

  @Put(':sku')
  async update(
    @Param() skuObj: { sku: string },
    @Body() productoDto: ProductoDto,
  ): Promise<Producto> {
    const { sku } = skuObj;
    return this.productosService.update(Number(sku), productoDto);
  }

  @Delete(':sku')
  remove(@Param() skuObj: { sku: string }): Promise<{ deletedCount: number }> {
    const { sku } = skuObj;
    return this.productosService.remove(Number(sku));
  }
}
