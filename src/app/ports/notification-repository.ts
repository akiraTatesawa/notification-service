import { Notification } from '../../domain/notification/notification';

export abstract class NotificationRepository {
  public abstract create(notification: Notification): Promise<void>;
}
