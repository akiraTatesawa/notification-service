import { Notification } from '@domain/notification/notification';
import { NotificationDTO } from '../dtos/notification.dto';

export class NotificationAppMapper {
  public static toDTO(notification: Notification): NotificationDTO {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
    };
  }
}
