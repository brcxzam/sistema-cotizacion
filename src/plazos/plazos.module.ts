import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlazosController } from './plazos.controller';
import { PlazosService } from './plazos.service';
import { Plazo, PlazoSchema } from './plazo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plazo.name, schema: PlazoSchema }]),
  ],
  controllers: [PlazosController],
  providers: [PlazosService],
})
export class PlazosModule {}
