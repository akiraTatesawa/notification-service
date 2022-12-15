import { Injectable } from '@nestjs/common';
import { UseCase } from '@core/app/use-case';
import { Notification } from '@domain/notification/notification';
import { NotificationRepository } from '@app/ports/notification-repository';
import { SendNotificationRequest } from './request';
import { NotificationDTO } from '@app/dtos/notification.dto';
import { NotificationAppMapper } from '@app/mappers/notification-app-mapper';

@Injectable()
export class SendNotification extends UseCase<SendNotificationRequest, NotificationDTO> {
  private readonly notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    super();
    this.notificationRepository = notificationRepository;
  }

  public async execute(requestData: SendNotificationRequest): Promise<NotificationDTO> {
    const { category, content, recipientId } = requestData;

    const notification = Notification.create({
      category,
      content,
      recipientId,
    });

    await this.notificationRepository.create(notification);

    return NotificationAppMapper.toDTO(notification);
  }
}
