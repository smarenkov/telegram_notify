import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ required: true })
  id: number;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  username: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);