import { randUuid } from '@ngneat/falso';
import { InMemoryNotificationRepository } from '@infra/data/repositories/in-memory/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notification.use-case';
import { CountNotificationsRequest } from './request';
import { Notification } from '@domain/notification/notification';

describe('Count Recipient Notifications Use Case', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let sut: CountRecipientNotifications;

  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new CountRecipientNotifications(notificationRepository);
  });

  it('Should return the notification count given a recipientId', async () => {
    const notification = Notification.create({
      recipientId: randUuid(),
      category: 'fake category',
      content: 'fake content',
    });
    await notificationRepository.create(notification);
    const request: CountNotificationsRequest = {
      recipientId: notification.recipientId,
    };

    const result = await sut.execute(request);

    expect(result.count).toEqual(1);
    expect(result.recipientId).toEqual(request.recipientId);
    expect(result).toMatchObject({
      count: 1,
      recipientId: request.recipientId,
    });
  });

  it('Should return zero if the recipient has no notifications', async () => {
    const request: CountNotificationsRequest = {
      recipientId: randUuid(),
    };

    const result = await sut.execute(request);

    expect(result.count).toEqual(0);
    expect(result.recipientId).toEqual(request.recipientId);
    expect(result).toMatchObject({
      count: 0,
      recipientId: request.recipientId,
    });
  });
});
