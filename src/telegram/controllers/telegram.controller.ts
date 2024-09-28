import { Controller } from '@nestjs/common';

import { EventPattern, Payload } from '@nestjs/microservices';
import { TelegramService } from '../services/telegram.service';
import { UserDto } from 'src/common/dto/user.dto';

@Controller()
export class TelegramController {
  constructor(private readonly service: TelegramService) {}

  @EventPattern('user_created')
  handleUserSaved(@Payload() user: UserDto) {
    return this.service.notifyAdmin(
      `New user with name: ${user.firstName} ${user.lastName} was created`,
    );
  }
}
