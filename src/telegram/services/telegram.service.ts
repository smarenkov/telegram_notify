import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateChatDto } from 'src/chats/dto/chat.create.dto';
import { Chat } from 'src/chats/models/chat.schema';
import { ChatsService } from 'src/chats/services/chats.service';
import {
  chat_already_subscribed,
  chat_subscribe,
  chat_subscribed,
  chat_unsubscribed,
} from 'src/common/constants/telegram_messages';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
  private bot: InstanceType<typeof TelegramBot>;

  constructor(
    private configService: ConfigService,
    private chatsService: ChatsService,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.on('message', async (msg) => {
      let chat = await this.chatsService.getById(msg.chat.id);
      const text = msg.text.toLowerCase();

      if (!chat) {
        if (text === '/start' || text === '/subscribe') {
          chat = await this.subscribe(msg.chat);
          return this.sendMessage(chat.id, chat_subscribed);
        } else {
          return this.sendMessage(msg.chat.id, chat_subscribe);
        }
      }

      if (text === '/start' || text === '/subscribe') {
        return this.sendMessage(chat.id, chat_already_subscribed);
      }

      if (text === '/unsubscribe') {
        await this.unsubscribe(chat.id);
        return this.sendMessage(chat.id, chat_unsubscribed);
      }
    });
  }

  async unsubscribe(chatId: number): Promise<void> {
    await this.chatsService.delete(chatId);
    Logger.log(`Chat ${chatId} has unsubscribed.`);
  }

  async subscribe(dto: CreateChatDto): Promise<Chat> {
    const chat = await this.chatsService.create(dto);
    Logger.log(`Chat ${chat.id} has subscribed.`);

    return chat;
  }

  sendMessage(chatId: number, message: string): void {
    this.bot.sendMessage(chatId, message);
  }

  async notifyAdmin(message: string): Promise<void> {
    const chats = await this.chatsService.getAll();

    for (const chat of chats) {
      await this.bot.sendMessage(chat.id, message);
      Logger.log(`Notified admin: [${chat.id}] @${chat.username}`);
    }
  }
}
