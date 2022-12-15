import { Notification } from '@domain/notification/notification';
import { NotificationPersistence } from '../persistence/notification-persistence';

export class NotificationDataMapper {
  public static toPersistence(domain: Notification): NotificationPersistence {
    return {
      id: domain.id,
      category: domain.category,
      content: domain.content.value,
      recipientId: domain.recipientId,
      readAt: domain.readAt ?? null,
      cancelledAt: domain.cancelledAt ?? null,
      createdAt: domain.createdAt,
    };
  }

  public static toDomain(rawNotification: NotificationPersistence): Notification {
    const notification = Notification.create({
      id: rawNotification.id,
      category: rawNotification.category,
      content: rawNotification.content,
      recipientId: rawNotification.recipientId,
      readAt: rawNotification.readAt,
      cancelledAt: rawNotification.cancelledAt,
      createdAt: rawNotification.createdAt,
    });

    return notification;
  }
}
