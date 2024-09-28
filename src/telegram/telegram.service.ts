import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatsService } from 'src/chats/chats.service';

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
      const chatId = msg.chat.id;
      const text = msg.text.toLowerCase();
    
      if (text === 'unsubscribe') {
        await this.chatsService.delete(msg.chat);
        Logger.log(`Chat ${chatId} has unsubscribed.`);
        return this.sendMessage(chatId, `You have been unsubscribed.`);
      }
    
      await this.chatsService.create(msg.chat);
      this.sendMessage(chatId, `You have been saved for further notifications. To unsubscribe, text me 'unsubscribe'.`);
    });
    
  }

  sendMessage(chatId: string, message: string): void {
    this.bot.sendMessage(chatId, message);
  }

  async notifyAdmin(message: string): Promise<void> {
    const chats = await this.chatsService.getAll();
    
    for (const chat of chats) {
      await this.bot.sendMessage(chat.id, message);
      Logger.log(`Notified admin: [${chat.id}] ${chat.firstName} ${chat.lastName} @${chat.username}`);
    }
  }
}
