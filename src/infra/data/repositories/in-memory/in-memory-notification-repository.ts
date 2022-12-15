import { NotificationRepository } from '@app/ports/notification-repository';
import { Notification } from '@domain/notification/notification';
import { NotificationDataMapper } from '@infra/data/mappers/notification-data-mapper';
import { NotificationPersistence } from '@infra/data/persistence/notification-persistence';

export class InMemoryNotificationRepository extends NotificationRepository {
  public notifications: Array<NotificationPersistence> = [];

  public async create(notification: Notification): Promise<void> {
    const rawNotification = NotificationDataMapper.toPersistence(notification);

    this.notifications.push(rawNotification);
  }

  public async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (rawNotification) => rawNotification.id === notification.id,
    );

    const rawNotification = NotificationDataMapper.toPersistence(notification);

    this.notifications[notificationIndex] = rawNotification;
  }

  public async findById(notificationId: string): Promise<Notification | null> {
    const rawNotification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!rawNotification) return null;

    return NotificationDataMapper.toDomain(rawNotification);
  }

  public async countManyByRecipientId(recipientId: string): Promise<number> {
    const notificationsByRecipientId = this.notifications.filter(
      (rawNotification) => rawNotification.recipientId === recipientId,
    );

    return notificationsByRecipientId.length;
  }

  public async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const rawNotifications = this.notifications.filter(
      (rawNotification) => rawNotification.recipientId === recipientId,
    );

    return rawNotifications.map((rawNotification) =>
      NotificationDataMapper.toDomain(rawNotification),
    );
  }
}
