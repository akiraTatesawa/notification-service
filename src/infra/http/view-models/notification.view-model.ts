import { NotificationDTO } from '@app/dtos/notification.dto';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationViewModel {
  @ApiProperty({
    type: NotificationDTO,
    description: 'The notification that has been created',
  })
  notification: NotificationDTO;
}
