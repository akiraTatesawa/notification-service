import { Injectable } from '@nestjs/common';
import { UseCase } from '@core/app/use-case';
import { Notification } from '@domain/notification/notification';
import { NotificationRepository } from '@app/ports/notification-repository';
import { SendNotificationRequest } from './request';
import { SendNotificationResponse } from './response';

@Injectable()
export class SendNotification extends UseCase<
  SendNotificationRequest,
  SendNotificationResponse
> {
  private readonly notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    super();
    this.notificationRepository = notificationRepository;
  }

  public async execute(
    requestData: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = requestData;

    const notification = Notification.create({
      category,
      content,
      recipientId,
    });

    await this.notificationRepository.create(notification);

    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
    };
  }
}
