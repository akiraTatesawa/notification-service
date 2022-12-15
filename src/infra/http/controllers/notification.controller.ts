import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SendNotification } from '@app/use-cases/send-notification/send-notification.use-case';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { BadRequestInterceptor } from '../interceptors/bad-request-interceptor';
import { NotificationViewModelMapper } from '../view-models/mappers/notification-view-model-mapper';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotification } from '@app/use-cases/cancel-notification/cancel-notification.use-case';
import { NotFoundInterceptor } from '../interceptors/not-found-interceptor';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications/count-recipient-notification.use-case';
import { CountNotificationsViewModel } from '../view-models/count-notifications.view-model';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications/get-recipient-notifications.use-case';
import { ManyNotificationsViewModel } from '../view-models/many-notifications.view-model';
import { ReadNotification } from '@app/use-cases/read-notification/read-notification.use-case';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  private readonly sendNotification: SendNotification;

  private readonly cancelNotification: CancelNotification;

  private readonly countRecipientNotifications: CountRecipientNotifications;

  private readonly getRecipientNotifications: GetRecipientNotifications;

  private readonly readNotification: ReadNotification;

  constructor(
    sendNotification: SendNotification,
    cancelNotification: CancelNotification,
    countRecipientNotifications: CountRecipientNotifications,
    getRecipientNotifications: GetRecipientNotifications,
    readNotification: ReadNotification,
  ) {
    this.sendNotification = sendNotification;
    this.cancelNotification = cancelNotification;
    this.countRecipientNotifications = countRecipientNotifications;
    this.getRecipientNotifications = getRecipientNotifications;
    this.readNotification = readNotification;
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
  public async create(@Body() body: CreateNotificationDTO): Promise<NotificationViewModel> {
    const { category, content, recipientId } = body;

    const notificationDTO = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return NotificationViewModelMapper.toHTTP(notificationDTO);
  }

  @Patch(':id/cancel')
  @UseInterceptors(NotFoundInterceptor)
  @ApiOkResponse({
    description: 'Notification Cancelled',
  })
  @ApiNotFoundResponse({
    description: 'Notification Not Found',
  })
  @ApiParam({
    name: 'id',
    description: 'Notification id',
    example: '1418e8b0-7bf7-11ed-a1eb-0242ac120002',
  })
  public async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  @UseInterceptors(NotFoundInterceptor)
  @ApiOkResponse({
    description: 'Notification Read',
  })
  @ApiNotFoundResponse({
    description: 'Notification Not Found',
  })
  @ApiParam({
    name: 'id',
    description: 'Notification id',
    example: '1418e8b0-7bf7-11ed-a1eb-0242ac120002',
  })
  public async read(@Param('id') id: string): Promise<void> {
    await this.readNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  @ApiOkResponse({
    description: 'Count how many notifications a recipient have',
    type: CountNotificationsViewModel,
  })
  @ApiParam({
    name: 'recipientId',
    description: 'The id from a recipient',
    example: '1418e8b0-7bf7-11ed-a1eb-0242ac120002',
  })
  public async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<CountNotificationsViewModel> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      recipientId,
      count,
    };
  }

  @Get('from/:recipientId')
  @ApiParam({
    name: 'recipientId',
    description: 'The id from a recipient',
    example: '1418e8b0-7bf7-11ed-a1eb-0242ac120002',
  })
  @ApiOkResponse({
    description: 'A list of notifications related to the recipientId',
    type: ManyNotificationsViewModel,
  })
  public async getFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<ManyNotificationsViewModel> {
    const notifications = await this.getRecipientNotifications.execute({ recipientId });

    return {
      notifications,
    };
  }
}
