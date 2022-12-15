import { UseCase } from '@core/app/use-case';
import { CancelNotificationRequest } from './request';
import { NotificationRepository } from '@app/ports/notification-repository';
import { NotificationNotFoundError } from '@app/errors/notification-not-found-error';

export class CancelNotification extends UseCase<
  CancelNotificationRequest,
  void
> {
  private readonly notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    super();
    this.notificationRepository = notificationRepository;
  }

  public async execute(requestData: CancelNotificationRequest): Promise<void> {
    const { notificationId } = requestData;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw NotificationNotFoundError.create();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
