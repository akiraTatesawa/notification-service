import { Injectable } from '@nestjs/common';
import { PrismaNotification } from '@prisma/client';
import { Notification } from '@domain/notification/notification';
import { NotificationRepository } from '@app/ports/notification-repository';
import { NotificationDataMapper } from '@infra/data/mappers/notification-data-mapper';
import { PrismaService } from '@infra/data/prisma/prisma.service';

@Injectable()
export class PrismaNotificationRepository extends NotificationRepository {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }

  public async create(notification: Notification): Promise<void> {
    const rawNotification: PrismaNotification =
      NotificationDataMapper.toPersistence(notification);

    await this.prisma.prismaNotification.create({
      data: rawNotification,
    });
  }

  public async save(notification: Notification): Promise<void> {
    const rawNotification: PrismaNotification =
      NotificationDataMapper.toPersistence(notification);

    await this.prisma.prismaNotification.update({
      where: {
        id: rawNotification.id,
      },
      data: rawNotification,
    });
  }

  public async findById(notificationId: string): Promise<Notification | null> {
    const rawNotification = await this.prisma.prismaNotification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!rawNotification) return null;

    return NotificationDataMapper.toDomain(rawNotification);
  }
}
