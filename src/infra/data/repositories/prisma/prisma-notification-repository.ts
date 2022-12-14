import { PrismaNotification } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Notification } from 'src/domain/notification/notification';
import { NotificationRepository } from '../../../../app/ports/notification-repository';

export class PrismaNotificationRepository extends NotificationRepository {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }

  public async create(notification: Notification): Promise<void> {
    const rawNotification: PrismaNotification = {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt ?? null,
      createdAt: notification.createdAt,
    };

    await this.prisma.prismaNotification.create({
      data: rawNotification,
    });
  }
}
