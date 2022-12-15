import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateNotificationDTO {
  @ApiProperty({
    name: 'content',
    example: 'Notification content',
    description: 'The content of the notification',
    required: true,
    minLength: 5,
    maxLength: 240,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @ApiProperty({
    name: 'category',
    example: 'Notification category',
    description: 'The category of the notification',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    name: 'recipientId',
    example: '1418e8b0-7bf7-11ed-a1eb-0242ac120002',
    description: 'The recipient id from the notification. Must be an UUID',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
