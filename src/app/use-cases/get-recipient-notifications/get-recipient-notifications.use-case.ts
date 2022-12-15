import { NotificationDTO } from '@app/dtos/notification.dto';
import { NotificationRepository } from '@app/ports/notification-repository';
import { UseCase } from '@core/app/use-case';
import { GetRecipientNotificationsRequest } from './request';
import { NotificationAppMapper } from '@app/mappers/notification-app-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetRecipientNotifications extends UseCase<
  GetRecipientNotificationsRequest,
  NotificationDTO[]
> {
  private readonly notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    super();
    this.notificationRepository = notificationRepository;
  }

  public async execute(requestData: GetRecipientNotificationsRequest): Promise<NotificationDTO[]> {
    const { recipientId } = requestData;

    const notifications = await this.notificationRepository.findManyByRecipientId(recipientId);

    return notifications.map((domainNotification) =>
      NotificationAppMapper.toDTO(domainNotification),
    );
  }
}
