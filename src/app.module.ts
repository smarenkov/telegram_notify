import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from 'src/telegram/telegram.module';
import { ChatsModule } from './chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/telegram_notify'),
    ConfigModule.forRoot(),
    TelegramModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
