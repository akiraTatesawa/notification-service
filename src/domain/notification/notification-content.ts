import { InvalidParamsError } from '../errors/invalid-params-error';
import { ValueObject } from '../../core/domain/value-object';

interface NotificationContentProps {
  value: string;
}

export class NotificationContent extends ValueObject<NotificationContentProps> {
  private constructor(props: NotificationContentProps) {
    super(props);
  }

  public get value(): string {
    return this._props.value;
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
