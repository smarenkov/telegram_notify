import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigModule } from '@nestjs/config';
import { TelegramController } from './telegram.controller';
import { ChatsService } from 'src/chats/chats.service';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports: [ConfigModule, ChatsModule],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule { }
