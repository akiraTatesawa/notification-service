import { Entity } from 'src/core/domain/entity';
import { NotificationContent } from './notification-content';

interface NotificationProps {
  recipientId: string;
  content: NotificationContent;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

interface CreateNotificationProps {
  id?: string;
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null;
  createdAt?: Date;
}

export class Notification extends Entity<NotificationProps> {
  private constructor(props: NotificationProps, id?: string) {
    super(props, id);
  }

  public get recipientId(): string {
    return this._props.recipientId;
  }

  public get content(): NotificationContent {
    return this._props.content;
  }

  public get category(): string {
    return this._props.category;
  }

  public set readAt(value: Date | null | undefined) {
    this._props.readAt = value;
  }

  public get readAt(): Date | null | undefined {
    return this._props.readAt;
  }

  public static create(props: CreateNotificationProps): Notification {
    const notificationContent = NotificationContent.create(props.content);
    const readAt = props.readAt !== undefined ? props.readAt : undefined;
    const createdAt = props.createdAt ?? new Date();

    return new Notification(
      {
        recipientId: props.recipientId,
        category: props.category,
        content: notificationContent,
        readAt,
        createdAt,
      },
      props.id,
    );
  }
}
