import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '@app/errors/notification-not-found-error';
import { NotificationRepository } from '@app/ports/notification-repository';
import { UseCase } from '@core/app/use-case';
import { UnreadNotificationRequest } from './request';

@Injectable()
export class UnreadNotification extends UseCase<UnreadNotificationRequest, void> {
  private readonly notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    super();
    this.notificationRepository = notificationRepository;
  }

  public async execute(requestData: UnreadNotificationRequest): Promise<void> {
    const { notificationId } = requestData;

    const notification = await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw NotificationNotFoundError.create();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
