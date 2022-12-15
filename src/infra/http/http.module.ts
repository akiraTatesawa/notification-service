import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notification.controller';
import { DatabaseModule } from '../data/prisma/database.module';
import { CancelNotification } from '@app/use-cases/cancel-notification/cancel-notification.use-case';
import { SendNotification } from '@app/use-cases/send-notification/send-notification.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification, CancelNotification],
})
export class HTTPModule {}
