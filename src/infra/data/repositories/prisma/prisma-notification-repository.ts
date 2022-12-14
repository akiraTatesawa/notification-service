import { Injectable } from '@nestjs/common';
import { PrismaNotification } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Notification } from '@domain/notification/notification';
import { NotificationRepository } from '@app/ports/notification-repository';

@Injectable()
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
