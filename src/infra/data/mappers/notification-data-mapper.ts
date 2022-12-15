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
      createdAt: domain.createdAt,
    };
  }

  public static toDomain(
    rawNotification: NotificationPersistence,
  ): Notification {
    const notification = Notification.create({
      id: rawNotification.id,
      category: rawNotification.category,
      content: rawNotification.content,
      recipientId: rawNotification.recipientId,
      createdAt: rawNotification.createdAt,
      readAt: rawNotification.readAt,
    });

    return notification;
  }
}
