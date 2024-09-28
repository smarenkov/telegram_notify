import { Module } from '@nestjs/common';
import { TelegramService } from './services/telegram.service';
import { ConfigModule } from '@nestjs/config';
import { TelegramController } from './controllers/telegram.controller';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports: [ConfigModule, ChatsModule],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
