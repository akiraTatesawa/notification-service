import { NotificationRepository } from '../../../app/ports/notification-repository';
import { Notification } from '../../../domain/notification/notification';

export class InMemoryNotificationRepository extends NotificationRepository {
  public notifications: Array<Notification> = [];

  public async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
