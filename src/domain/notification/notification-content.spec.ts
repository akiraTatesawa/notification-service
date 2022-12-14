import { InvalidParamsError } from '../errors/invalid-params-error';
import { NotificationContent } from './notification-content';

describe('Notification Content Value Object', () => {
  describe('Success', () => {
    it('Should be able to create a notification content value object', () => {
      const content = 'This is a valid notification content';

      const result = NotificationContent.create(content);

      expect(result).toBeInstanceOf(NotificationContent);
      expect(result.value).toBeDefined();
      expect(result.value).toEqual(content);
    });
  });

  describe('Fail', () => {
    it('Should throw if the content is less than 5 char long', () => {
      const invalidContent = '';

      const result = () => {
        NotificationContent.create(invalidContent);
      };

      expect(result).toThrow(
        InvalidParamsError.create(
          'Content must be between 5 and 240 characters long',
        ),
      );
    });

    it('Should throw if the content is greater than 240 char long', () => {
      const invalidContent = 'a'.repeat(241);

      const result = () => {
        NotificationContent.create(invalidContent);
      };

      expect(result).toThrow(
        InvalidParamsError.create(
          'Content must be between 5 and 240 characters long',
        ),
      );
    });
  });
});
