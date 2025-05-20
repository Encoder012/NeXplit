// Types
export interface Notification {
  id: string
  type: "payment" | "access" | "system" | "security"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  actionText?: string
}

// Mock data
const mockNotifications: Notification[] = [
  {
    id: "notif_1",
    type: "payment",
    title: "Payment Released",
    message: "50% payment for Netflix Premium subscription has been released from escrow.",
    timestamp: "2025-05-14T10:30:00Z",
    read: false,
    actionUrl: "/splits/split_123",
    actionText: "View Details",
  },
  {
    id: "notif_2",
    type: "access",
    title: "New Access Request",
    message: "John Doe has requested access to your Disney+ subscription.",
    timestamp: "2025-05-13T15:45:00Z",
    read: false,
    actionUrl: "/my-listings/listing_456",
    actionText: "Review Request",
  },
  {
    id: "notif_3",
    type: "system",
    title: "System Maintenance",
    message: "neXplit will undergo scheduled maintenance on May 20, 2025, from 2:00 AM to 4:00 AM UTC.",
    timestamp: "2025-05-12T09:15:00Z",
    read: true,
  },
  {
    id: "notif_4",
    type: "security",
    title: "Wallet Connected",
    message: "A new wallet has been connected to your account.",
    timestamp: "2025-05-11T18:20:00Z",
    read: true,
    actionUrl: "/account",
    actionText: "Review Security",
  },
  {
    id: "notif_5",
    type: "payment",
    title: "Payment Received",
    message: "You received 25.50 USDC for your HBO Max subscription share.",
    timestamp: "2025-05-10T14:10:00Z",
    read: true,
    actionUrl: "/dashboard",
    actionText: "View Dashboard",
  },
]

// Service
class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [...mockNotifications]
  }

  async getUnreadCount(): Promise<number> {
    const notifications = await this.getNotifications()
    return notifications.filter((notif) => !notif.read).length
  }

  async markAsRead(id: string): Promise<void> {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock implementation
    const index = mockNotifications.findIndex((notif) => notif.id === id)
    if (index !== -1) {
      mockNotifications[index].read = true
    }
  }

  async markAllAsRead(): Promise<void> {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock implementation
    mockNotifications.forEach((notif) => {
      notif.read = true
    })
  }

  async deleteNotification(id: string): Promise<void> {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock implementation - we can't actually delete from the mock array
    // but in a real implementation this would delete the notification
  }
}

export const notificationService = new NotificationService()
