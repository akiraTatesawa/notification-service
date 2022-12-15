import { Notification } from '@domain/notification/notification';
import { NotificationDataMapper } from '@infra/data/mappers/notification-data-mapper';
import { PrismaService } from '@infra/data/prisma/prisma.service';

export async function insertNotification(notification: Notification) {
  const prisma = new PrismaService();

  const raw = NotificationDataMapper.toPersistence(notification);

  await prisma.prismaNotification.create({
    data: raw,
  });
}
