import { InMemoryNotificationRepository } from '@infra/data/repositories/in-memory/in-memory-notification-repository';
import { NotificationFactory } from '@test/factories/notification-factory';
import { Notification } from '@domain/notification/notification';
import { ReadNotification } from './read-notification.use-case';
import { randUuid } from '@ngneat/falso';
import { NotificationNotFoundError } from '@app/errors/notification-not-found-error';

describe('Read Notification Use Case', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let sut: ReadNotification;
  let notification: Notification;

  beforeEach(async () => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new ReadNotification(notificationRepository);

    notification = NotificationFactory.makeNotification();
  });

  describe('Success', () => {
    it('Should be able to read a notification', async () => {
      await notificationRepository.create(notification);

      await sut.execute({ notificationId: notification.id });

      expect(notificationRepository.notifications).toHaveLength(1);
      expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date));
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
