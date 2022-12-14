import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotificationRepository } from '../../../app/ports/notification-repository';
import { PrismaNotificationRepository } from '../repositories/prisma/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
