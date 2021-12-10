import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductoDto } from './producto.dto';
import { Producto, ProductoDocument } from './producto.schema';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<ProductoDocument>,
  ) {}

  async create(productoDto: ProductoDto): Promise<Producto> {
    const createdProducto = new this.productoModel(productoDto);
    return createdProducto.save();
  }

  async findAll(): Promise<Producto[]> {
    const productos = await this.productoModel.find().exec();
    if (productos.length > 0) {
      return productos;
    } else {
      this.notFound();
    }
  }

  async findBySKU(sku: number): Promise<Producto[]> {
    const productos = await this.productoModel.find({ sku }).exec();
    if (productos.length > 0) {
      return productos;
    } else {
      this.notFound();
    }
  }

  async findByDesc(descripcion: string): Promise<Producto[]> {
    const productos = await this.productoModel.find({ descripcion: { $regex: '.*' + descripcion + '.*' } }).exec();
    if (productos.length > 0) {
      return productos;
    } else {
      this.notFound();
    }
  }

  async update(sku: number, productoDto: ProductoDto): Promise<Producto> {
    return this.productoModel
      .findOneAndUpdate({ sku }, { ...productoDto })
      .exec();
  }

  async remove(sku: number): Promise<{ deletedCount: number }> {
    return this.productoModel.remove({ sku }).exec();
  }

  notFound() {
    throw new HttpException(
      { message: 'No se encontraron coincidencias' },
      HttpStatus.NOT_FOUND,
    );
  }
}
