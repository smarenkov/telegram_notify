import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      },
    ]),
  ],
  exports: [ChatsService],
  providers: [ChatsService],
})
export class ChatsModule {}
