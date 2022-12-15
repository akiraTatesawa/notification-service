export interface NotificationPersistence {
  id: string;
  content: string;
  category: string;
  recipientId: string;
  readAt: Date | null;
  cancelledAt: Date | null;
  createdAt: Date;
}
