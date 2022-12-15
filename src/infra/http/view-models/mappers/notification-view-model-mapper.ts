import { NotificationDTO } from '@app/dtos/notification.dto';
import { NotificationViewModel } from '../notification.view-model';

export class NotificationViewModelMapper {
  public static toHTTP(dto: NotificationDTO): NotificationViewModel {
    return {
      notification: dto,
    };
  }
}
