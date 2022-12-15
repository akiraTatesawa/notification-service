import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SendNotification } from '@app/use-cases/send-notification/send-notification.use-case';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { BadRequestInterceptor } from '../interceptors/bad-request-interceptor';
import { NotificationViewModelMapper } from '../view-models/mappers/notification-view-model-mapper';
import { NotificationViewModel } from '../view-models/notification.view-model';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  private readonly sendNotification: SendNotification;

  constructor(sendNotification: SendNotification) {
    this.sendNotification = sendNotification;
  }

  @Post()
  @UseInterceptors(BadRequestInterceptor)
  @ApiOperation({ summary: 'Create a Notification' })
  @ApiCreatedResponse({
    description: 'Notification Created',
    type: NotificationViewModel,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Params',
  })
  async create(
    @Body() body: CreateNotificationDTO,
  ): Promise<NotificationViewModel> {
    const { category, content, recipientId } = body;

    const notificationDTO = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return NotificationViewModelMapper.toHTTP(notificationDTO);
  }
}
