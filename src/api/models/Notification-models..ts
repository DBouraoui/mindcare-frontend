export interface NotificationModels {
    id: number;
    title: string;
    description: string;
    type: NotificationType;
    readAt?: string;
    createdAt?: string;
}

type NotificationType = 'simple' | 'warning' | 'alert';

export interface ReadNotificationModel {
    id: string;
}