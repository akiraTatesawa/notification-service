import { randUuid } from '@ngneat/falso';
import { CreateNotificationProps, Notification } from '@domain/notification/notification';

type OverrideNotification = Partial<CreateNotificationProps>;

export class NotificationFactory {
  public static makeNotification(props: OverrideNotification = {}): Notification {
    return Notification.create({
      recipientId: randUuid(),
      category: 'fake category',
      content: 'fake content',
      ...props,
    });
  }
}
