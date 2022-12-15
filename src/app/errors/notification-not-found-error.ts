export class NotificationNotFoundError extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static create(): NotificationNotFoundError {
    return new NotificationNotFoundError('Notification not found');
  }
}
