import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './data/prisma/database.module';
import { HTTPModule } from './http/http.module';

@Module({
  imports: [HTTPModule, DatabaseModule, ConfigModule.forRoot()],
})
export class AppModule {}
