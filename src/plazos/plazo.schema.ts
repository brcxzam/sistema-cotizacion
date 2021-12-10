import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlazoDocument = Plazo & Document;

@Schema()
export class Plazo {
  @Prop({ required: true, unique: true })
  plazo: number;

  @Prop({ required: true })
  tasaNormal: number;

  @Prop({ required: true })
  tasaPuntual: number;
}

export const PlazoSchema = SchemaFactory.createForClass(Plazo);
