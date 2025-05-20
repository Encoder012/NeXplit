"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock notifications
        const mockNotifications: Notification[] = [
          {
            id: "notif_1",
            title: "Payment Released",
            message: "50% payment for Netflix Premium has been released from escrow.",
            timestamp: "2025-05-14T10:30:00Z",
            read: false,
            actionUrl: "/splits/split_123",
          },
          {
            id: "notif_2",
            title: "New Access Request",
            message: "John Doe has requested access to your Disney+ subscription.",
            timestamp: "2025-05-13T15:45:00Z",
            read: false,
            actionUrl: "/my-listings/listing_456",
          },
          {
            id: "notif_3",
            title: "System Maintenance",
            message: "neXplit will undergo scheduled maintenance on May 20, 2025.",
            timestamp: "2025-05-12T09:15:00Z",
            read: true,
          },
        ]

        setNotifications(mockNotifications)
      } catch (error) {
        console.error("Failed to fetch notifications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()

    // Set up polling for new notifications
    const interval = setInterval(fetchNotifications, 60000) // Poll every minute
    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((notif) => !notif.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-4 px-2 text-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          <>
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 ${notification.read ? "" : "bg-primary/5"}`}
                onClick={() => markAsRead(notification.id)}
                asChild
              >
                <Link href={notification.actionUrl || "/notifications"}>
                  <div className="w-full">
                    <div className="flex items-start justify-between">
                      <span className="font-medium">{notification.title}</span>
                      {!notification.read && <Badge className="ml-2 h-1.5 w-1.5 rounded-full p-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      · {new Date(notification.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="justify-center text-sm font-medium">
              <Link href="/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
