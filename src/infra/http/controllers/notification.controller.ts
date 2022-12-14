import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendNotification } from '@app/use-cases/send-notification/send-notification.use-case';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { BadRequestInterceptor } from '../interceptors/bad-request-interceptor';

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
  @ApiResponse({
    status: 201,
    description: 'Notification Created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Params',
  })
  async create(@Body() body: CreateNotificationDTO) {
    const { category, content, recipientId } = body;

    await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
  }
}
