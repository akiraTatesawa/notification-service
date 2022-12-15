import { randUuid } from '@ngneat/falso';
import { InMemoryNotificationRepository } from '@infra/data/repositories/in-memory/in-memory-notification-repository';
import { NotificationFactory } from '@test/factories/notification-factory';
import { Notification } from '@domain/notification/notification';
import { NotificationNotFoundError } from '@app/errors/notification-not-found-error';
import { UnreadNotification } from './unread-notification.use-case';

describe('Unread Notification Use Case', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let sut: UnreadNotification;
  let notification: Notification;

  beforeEach(async () => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new UnreadNotification(notificationRepository);

    notification = NotificationFactory.makeNotification();
    notification.read();
  });

  describe('Success', () => {
    it('Should be able to unread a notification', async () => {
      await notificationRepository.create(notification);

      await sut.execute({ notificationId: notification.id });

      expect(notificationRepository.notifications).toHaveLength(1);
      expect(notificationRepository.notifications[0].readAt).toEqual(null);
    });
  });

  describe('Fail', () => {
    it('Should throw an error if the notification does not exist', async () => {
      const result = async () => {
        await sut.execute({ notificationId: randUuid() });
      };

      expect(result).rejects.toEqual(expect.any(NotificationNotFoundError));
      expect(result).rejects.toThrow('Notification not found');
    });
  });
});
