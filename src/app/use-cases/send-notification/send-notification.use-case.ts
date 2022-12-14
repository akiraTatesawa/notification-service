import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/app/use-case';
import { SendNotificationRequest } from './request';
import { SendNotificationResponse } from './response';
import { Notification } from '../../../domain/notification/notification';
import { NotificationRepository } from '../../ports/notification-repository';

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
