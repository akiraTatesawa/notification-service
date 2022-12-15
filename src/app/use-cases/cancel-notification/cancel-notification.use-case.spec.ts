import { randUuid } from '@ngneat/falso';
import { InMemoryNotificationRepository } from '@infra/data/repositories/in-memory/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification.use-case';
import { CancelNotificationRequest } from './request';
import { Notification } from '@domain/notification/notification';
import { NotificationNotFoundError } from '@app/errors/notification-not-found-error';

describe('Cancel Notification Use Case', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let sut: CancelNotification;
  let fakeNotification: Notification;

  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new CancelNotification(notificationRepository);

    fakeNotification = Notification.create({
      category: 'fake category',
      content: 'fake content',
      recipientId: randUuid(),
    });
  });

  describe('Success', () => {
    it('Should be able to cancel a notification', async () => {
      await notificationRepository.create(fakeNotification);
      const request: CancelNotificationRequest = {
        notificationId: fakeNotification.id,
      };

      await expect(sut.execute(request)).resolves.not.toThrow();

      expect(notificationRepository.notifications).toHaveLength(1);
      expect(notificationRepository.notifications[0].cancelledAt).toEqual(expect.any(Date));
    });
  });

  describe('Fail', () => {
    it('Should throw an error if the notification does not exist', async () => {
      const request: CancelNotificationRequest = {
        notificationId: randUuid(),
      };

      const result = async () => {
        await sut.execute(request);
      };

      expect(result).rejects.toEqual(NotificationNotFoundError.create());
      expect(result).rejects.toThrow('Notification not found');
    });
  });
});
