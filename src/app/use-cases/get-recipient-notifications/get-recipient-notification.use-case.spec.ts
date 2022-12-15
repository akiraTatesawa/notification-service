import { randUuid } from '@ngneat/falso';
import { InMemoryNotificationRepository } from '@infra/data/repositories/in-memory/in-memory-notification-repository';
import { GetRecipientNotifications } from './get-recipient-notifications.use-case';
import { NotificationFactory } from '@test/factories/notification-factory';

describe('Get Recipient Notification Use Case', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let sut: GetRecipientNotifications;
  let recipientId: string;

  beforeEach(async () => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new GetRecipientNotifications(notificationRepository);

    recipientId = randUuid();

    await notificationRepository.create(NotificationFactory.makeNotification({ recipientId }));
    await notificationRepository.create(NotificationFactory.makeNotification({ recipientId }));
  });

  it('Should return a list of notifications', async () => {
    const result = await sut.execute({ recipientId });

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId,
        }),
        expect.objectContaining({
          recipientId,
        }),
      ]),
    );
  });

  it('Should return an empty list if the recipient has no notifications', async () => {
    const result = await sut.execute({ recipientId: randUuid() });

    expect(result).toHaveLength(0);
  });
});
