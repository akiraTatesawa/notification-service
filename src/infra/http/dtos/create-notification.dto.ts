import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateNotificationDTO {
  @IsString()
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
