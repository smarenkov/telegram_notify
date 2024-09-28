import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  firstName: number;

  @IsString()
  lastName: number;

  @IsString()
  username: number;
}
