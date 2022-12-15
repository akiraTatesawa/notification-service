import { Notification } from '@domain/notification/notification';

export abstract class NotificationRepository {
  public abstract create(notification: Notification): Promise<void>;
  public abstract save(notification: Notification): Promise<void>;
  public abstract findById(
    notificationId: string,
  ): Promise<Notification | null>;
  public abstract countManyByRecipientId(recipientId: string): Promise<number>;
}
