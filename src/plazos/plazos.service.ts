import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plazo, PlazoDocument } from './plazo.schema';
import { PlazoDto } from './plazo.dto';

@Injectable()
export class PlazosService {
  constructor(
    @InjectModel(Plazo.name) private plazoModel: Model<PlazoDocument>,
  ) {}

  async create(plazoDto: PlazoDto): Promise<Plazo> {
    const createPlazo = new this.plazoModel(plazoDto);
    return createPlazo.save();
  }

  async findAll(): Promise<Plazo[]> {
    return this.plazoModel.find().exec();
  }

  async update(plazo: number, plazoDto: PlazoDto): Promise<Plazo> {
    return this.plazoModel.findOneAndUpdate({ plazo }, { ...plazoDto }).exec();
  }

  async remove(plazo: number): Promise<Plazo> {
    return this.plazoModel.remove({ plazo }).exec();
  }
}
