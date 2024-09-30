import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/** Se define y se exporta el esquema de Mongoose, para ser utilizado en los servicios */
@Schema({ strict: true })
export class Movie extends Document 
{
  @Prop({ required: true }) 
  title: string;

  @Prop({ type: [String], required: true })
  directors: string[];

  @Prop({ type: [String], required: true })
  cast: string[];

  @Prop({ type: [String], required: true }) 
  similar_year: string[];

  @Prop({ required: true})
  year : string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
