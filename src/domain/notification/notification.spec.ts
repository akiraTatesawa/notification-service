import { randPastDate, randUuid } from '@ngneat/falso';
import { CreateNotificationProps, Notification } from './notification';
import { NotificationContent } from './notification-content';

describe('Notification Entity', () => {
  describe('Success', () => {
    it('Should be able to create a notification entity', () => {
      const notificationProps: CreateNotificationProps = {
        category: 'Valid Category',
        content: 'Valid Content',
        recipientId: randUuid(),
      };

      const result = Notification.create(notificationProps);

      expect(result).toBeInstanceOf(Notification);
      expect(result).toHaveProperty('id');
      expect(result.createdAt).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.readAt).toEqual(undefined);
      expect(result.content).toBeInstanceOf(NotificationContent);
      expect(result.content.value).toEqual(notificationProps.content);
      expect(result.category).toEqual(notificationProps.category);
      expect(result.recipientId).toEqual(notificationProps.recipientId);
    });

    it('Should be able to create a notification entity with its optional props', () => {
      const notificationProps: CreateNotificationProps = {
        category: 'Valid Category',
        content: 'Valid Content',
        recipientId: randUuid(),
        createdAt: randPastDate(),
        readAt: new Date(),
        cancelledAt: new Date(),
        id: randUuid(),
      };

      const result = Notification.create(notificationProps);

      expect(result).toBeInstanceOf(Notification);
      expect(result.id).toEqual(notificationProps.id);
      expect(result.createdAt).toEqual(notificationProps.createdAt);
      expect(result.cancelledAt).toEqual(notificationProps.cancelledAt);
      expect(result.readAt).toEqual(notificationProps.readAt);
      expect(result.content).toBeInstanceOf(NotificationContent);
      expect(result.content.value).toEqual(notificationProps.content);
      expect(result.category).toEqual(notificationProps.category);
      expect(result.recipientId).toEqual(notificationProps.recipientId);
    });

    it('Should be able to read a notification', () => {
      const notificationProps: CreateNotificationProps = {
        category: 'Valid Category',
        content: 'Valid Content',
        recipientId: randUuid(),
      };
      const notification = Notification.create(notificationProps);
      notification.read();

      expect(notification.readAt).toEqual(expect.any(Date));
    });

    it('Should be able to unread a notification', () => {
      const notificationProps: CreateNotificationProps = {
        category: 'Valid Category',
        content: 'Valid Content',
        recipientId: randUuid(),
      };
      const notification = Notification.create(notificationProps);
      notification.unread();

      expect(notification.readAt).toEqual(null);
    });

    it('Should be able to cancel a notification', () => {
      const notificationProps: CreateNotificationProps = {
        category: 'Valid Category',
        content: 'Valid Content',
        recipientId: randUuid(),
      };
      const notification = Notification.create(notificationProps);

      notification.cancel();

      expect(notification.cancelledAt).toEqual(expect.any(Date));
    });
  });

  describe('Fail', () => {
    it('Should throw an error if the "category" is an empty string', () => {
      const notificationProps: CreateNotificationProps = {
        category: '',
        content: 'Valid Content',
        recipientId: randUuid(),
      };

      const result = () => {
        Notification.create(notificationProps);
      };

      expect(result).toThrow('Notification Category cannot be an empty string');
    });

    it('Should throw an error if the "recipientId" is an empty string', () => {
      const notificationProps: CreateNotificationProps = {
        category: 'Valid Category',
        content: 'Valid Content',
        recipientId: '',
      };

      const result = () => {
        Notification.create(notificationProps);
      };

      expect(result).toThrow('Recipient ID cannot be an empty string');
    });

    it('Should throw an error if the "recipientId" is not an UUID', () => {
      const notificationProps: CreateNotificationProps = {
        category: 'Valid Category',
        content: 'Valid Content',
        recipientId: 'Invalid ID',
      };

      const result = () => {
        Notification.create(notificationProps);
      };

      expect(result).toThrow('Recipient ID must be a valid UUID');
    });

    it('Should throw an error if "id" is not an UUID', () => {
      const notificationProps: CreateNotificationProps = {
        category: 'Valid Category',
        content: 'Valid Content',
        recipientId: randUuid(),
        createdAt: randPastDate(),
        readAt: new Date(),
        id: 'INVALID ID',
      };

      const result = () => {
        Notification.create(notificationProps);
      };

      expect(result).toThrow('Notification ID must be a valid UUID');
    });
  });
});
