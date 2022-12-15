import { NotificationDTO } from '@app/dtos/notification.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ManyNotificationsViewModel {
  @ApiProperty({
    description: 'List of notifications',
    minItems: 0,
    isArray: true,
    type: NotificationDTO,
  })
  notifications: NotificationDTO[];
}
