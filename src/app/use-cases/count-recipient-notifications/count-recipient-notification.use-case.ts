import { CountNotificationsDTO } from '@app/dtos/count-notification.dto';
import { NotificationRepository } from '@app/ports/notification-repository';
import { UseCase } from '@core/app/use-case';
import { Injectable } from '@nestjs/common';
import { CountNotificationsRequest } from './request';

@Injectable()
export class CountRecipientNotifications extends UseCase<
  CountNotificationsRequest,
  CountNotificationsDTO
> {
  private readonly notificationRepository: NotificationRepository;

  constructor(notificationRepository: NotificationRepository) {
    super();
    this.notificationRepository = notificationRepository;
  }

  public async execute(requestData: CountNotificationsRequest): Promise<CountNotificationsDTO> {
    const { recipientId } = requestData;

    const count = await this.notificationRepository.countManyByRecipientId(recipientId);

    return {
      count,
    };
  }
}
