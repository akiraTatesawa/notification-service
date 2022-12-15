import { NotificationNotFoundError } from '@app/errors/notification-not-found-error';
import { NotificationRepository } from '@app/ports/notification-repository';
import { UseCase } from '@core/app/use-case';
import { Injectable } from '@nestjs/common';
import { ReadNotificationRequest } from './request';

@Injectable()
export class ReadNotification extends UseCase<ReadNotificationRequest, void> {
  private readonly notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    super();
    this.notificationRepository = notificationRepository;
  }

  public async execute(requestData: ReadNotificationRequest): Promise<void> {
    const { notificationId } = requestData;

    const notification = await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw NotificationNotFoundError.create();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
