import { Controller } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserDto } from '../users/user.dto';

@Controller()
export class TelegramController {
  constructor(private readonly service: TelegramService) { }

  @EventPattern('user_created')
  handleUserSaved(@Payload() user: UserDto) {
    return this.service.notifyAdmin(`New user with name: ${user.firstName} ${user.lastName} was created`);
  }
}
