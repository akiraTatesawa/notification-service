import { PrismaService } from '@infra/data/prisma/prisma.service';

export async function clearDatabase(): Promise<void> {
  const prisma = new PrismaService();

  await prisma.$queryRaw`TRUNCATE TABLE notifications CASCADE`;
}
