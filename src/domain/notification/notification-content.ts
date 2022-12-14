import { ValueObject } from 'src/core/domain/value-object';
import { InvalidParamsError } from '../errors/invalid-params-error';

interface NotificationContentProps {
  value: string;
}

export class NotificationContent extends ValueObject<NotificationContentProps> {
  private constructor(props: NotificationContentProps) {
    super(props);
  }

  private static validate(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  public static create(content: string): NotificationContent {
    const isValid = NotificationContent.validate(content);

    if (!isValid) {
      const errorMessage = 'Content must be between 5 and 240 characters long';

      throw InvalidParamsError.create(errorMessage);
    }

    return new NotificationContent({ value: content });
  }
}
