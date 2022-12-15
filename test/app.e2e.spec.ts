import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HTTPModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/data/prisma/database.module';
import { ConfigModule } from '@nestjs/config';
import { CreateNotificationDTO } from '@infra/http/dtos/create-notification.dto';
import { randUuid } from '@ngneat/falso';
import { clearDatabase } from './helpers/clear-database';
import { NotificationFactory } from '@test/factories/notification-factory';
import { insertNotification } from './helpers/insert-notification';

describe('Notification Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        HTTPModule,
        DatabaseModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe('(POST) /notifications', () => {
    it('[201::CREATED] Should be able to create a notification', async () => {
      const requestBody: CreateNotificationDTO = {
        category: 'fake-category',
        content: 'fake-content',
        recipientId: randUuid(),
      };

      const response = await request(app.getHttpServer()).post('/notifications').send(requestBody);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          notification: expect.objectContaining({
            category: requestBody.category,
            content: requestBody.content,
            recipientId: requestBody.recipientId,
          }),
        }),
      );
    });

    it('[400:BAD_REQUEST] Should return an error if the request body is invalid', async () => {
      const requestBody: CreateNotificationDTO = {
        category: 'fake-category',
        content: 'fake-content',
        recipientId: 'invalid-id',
      };

      const response = await request(app.getHttpServer()).post('/notifications').send(requestBody);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: 400,
          message: ['recipientId must be a UUID'],
          error: 'Bad Request',
        }),
      );
    });
  });

  describe('(PATCH) /notifications/:id/cancel', () => {
    it('[200::OK] Should be able to cancel a notification', async () => {
      const notification = NotificationFactory.makeNotification();
      await insertNotification(notification);

      const response = await request(app.getHttpServer()).patch(
        `/notifications/${notification.id}/cancel`,
      );

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({});
    });

    it('[404::NOT_FOUND] Should return an error if the notification does not exist', async () => {
      const response = await request(app.getHttpServer()).patch(
        `/notifications/${randUuid}/cancel`,
      );

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: 404,
          message: 'Notification not found',
          error: 'Not Found',
        }),
      );
    });
  });

  describe('(PATCH) /notifications/:id/read', () => {
    it('[200::OK] Should be able to read a notification', async () => {
      const notification = NotificationFactory.makeNotification();
      await insertNotification(notification);

      const response = await request(app.getHttpServer()).patch(
        `/notifications/${notification.id}/read`,
      );

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({});
    });

    it('[404::NOT_FOUND] Should return an error if the notification does not exist', async () => {
      const response = await request(app.getHttpServer()).patch(`/notifications/${randUuid}/read`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: 404,
          message: 'Notification not found',
          error: 'Not Found',
        }),
      );
    });
  });

  describe('(PATCH) /notifications/:id/unread', () => {
    it('[200::OK] Should be able to unread a notification', async () => {
      const notification = NotificationFactory.makeNotification();
      await insertNotification(notification);

      const response = await request(app.getHttpServer()).patch(
        `/notifications/${notification.id}/unread`,
      );

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({});
    });

    it('[404::NOT_FOUND] Should return an error if the notification does not exist', async () => {
      const response = await request(app.getHttpServer()).patch(
        `/notifications/${randUuid}/unread`,
      );

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: 404,
          message: 'Notification not found',
          error: 'Not Found',
        }),
      );
    });
  });

  describe('(GET) /notifications/count/from/:recipientId', () => {
    it('[200::OK] Should return how many notifications a recipient has', async () => {
      const notification = NotificationFactory.makeNotification();
      await insertNotification(notification);

      const response = await request(app.getHttpServer()).get(
        `/notifications/count/from/${notification.recipientId}`,
      );

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          count: 1,
          recipientId: notification.recipientId,
        }),
      );
    });

    it('[200::OK] Should return a count equal to zero if there are no notifications', async () => {
      const recipientId = randUuid();

      const response = await request(app.getHttpServer()).get(
        `/notifications/count/from/${recipientId}`,
      );

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          count: 0,
          recipientId: recipientId,
        }),
      );
    });
  });

  describe('(GET) /notifications/from/:recipientId', () => {
    it('[200::OK] Should return all the notifications a recipient has', async () => {
      const notification = NotificationFactory.makeNotification();
      await insertNotification(notification);

      const response = await request(app.getHttpServer()).get(
        `/notifications/from/${notification.recipientId}`,
      );

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          notifications: expect.arrayContaining([
            expect.objectContaining({
              id: notification.id,
            }),
          ]),
        }),
      );
    });

    it('[200::OK] Should return an empty notifications array if there are no notifications', async () => {
      const recipientId = randUuid();

      const response = await request(app.getHttpServer()).get(`/notifications/from/${recipientId}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject({ notifications: [] });
    });
  });
});
