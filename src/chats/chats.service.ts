import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import { CreateChatDto } from './chat.create.dto';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private model: Model<Chat>) {}

  async create(dto: CreateChatDto): Promise<Chat> {
    try {
      const chat = await this.model.findOne({ id: dto.id });

      if (!chat) {
        const newChat = new this.model(dto);
        await newChat.save();
        Logger.log(`New chat created: ${newChat.id}`);
        return newChat;
      }

      Logger.warn(`Try to create a new chat that already exists: ${chat.id}`);
      return chat;
    } catch (error) {
      Logger.error('Error creating chat', error);
      throw new Error('Unable to create chat');
    }
  }

  async delete(dto: CreateChatDto): Promise<Chat> {
    try {
      const chat = await this.model.findOneAndDelete({ id: dto.id }).exec();

      if (!chat) {
        Logger.warn(`Chat not found for deletion: ${dto.id}`);
        throw new Error('Chat not found');
      }

      Logger.log(`Chat deleted: ${dto.id}`);
      return chat;
    } catch (error) {
      Logger.error('Error deleting chat', error);
      throw new Error('Unable to delete chat');
    }
  }

  async getAll(limit: number = 200, page: number = 1): Promise<Chat[]> {
    const skip = (page - 1) * limit;
    return this.model.find().limit(limit).skip(skip).exec();
  }
}
