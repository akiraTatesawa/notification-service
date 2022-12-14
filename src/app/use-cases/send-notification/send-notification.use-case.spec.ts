import { randUuid } from '@ngneat/falso';
import { SendNotification } from './send-notification.use-case';
import { SendNotificationRequest } from './request';
import { InMemoryNotificationRepository } from '../../../infra/data/repositories/in-memory/in-memory-notification-repository';

describe('Send Notification Use Case', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let sut: SendNotification;

  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new SendNotification(notificationRepository);
  });

  describe('Success', () => {
    it('Should be able to create a notification', async () => {
      const request: SendNotificationRequest = {
        recipientId: randUuid(),
        category: 'Valid Category',
        content: 'Valid Content',
      };

      const result = await sut.execute(request);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('category');
      expect(result).toHaveProperty('recipientId');
      expect(notificationRepository.notifications).toHaveLength(1);
    });
  });

  describe('Fail', () => {
    it('Should throw if the entity creation fails', async () => {
      const request: SendNotificationRequest = {
        recipientId: randUuid(),
        category: '',
        content: 'Valid Content',
      };

      await expect(sut.execute(request)).rejects.toThrowError(
        'Notification Category cannot be an empty string',
      );
      expect(notificationRepository.notifications).toHaveLength(0);
    });
  });
});
