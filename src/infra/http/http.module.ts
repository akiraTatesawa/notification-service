import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notification.controller';
import { SendNotification } from '../../app/use-cases/send-notification/send-notification.use-case';
import { DatabaseModule } from '../data/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HTTPModule {}
