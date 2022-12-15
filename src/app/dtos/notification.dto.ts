import { ApiProperty } from '@nestjs/swagger';

export class NotificationDTO {
  @ApiProperty({
    name: 'id',
    type: String,
    example: '8487063e-7c12-11ed-a1eb-0242ac120002',
    description: 'The notification id (UUID)',
  })
  id: string;

  @ApiProperty({
    name: 'content',
    type: String,
    example: 'Notification content',
    description: 'The notification content',
    maxLength: 240,
    minLength: 5,
  })
  content: string;

  @ApiProperty({
    name: 'category',
    type: String,
    example: 'Notification category',
    description: 'The notification category',
  })
  category: string;

  @ApiProperty({
    name: 'recipientId',
    type: String,
    example: '1418e8b0-7bf7-11ed-a1eb-0242ac120002',
    description: 'The recipient id from the notification (UUID)',
  })
  recipientId: string;
}
