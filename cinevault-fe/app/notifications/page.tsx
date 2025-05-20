"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Check, Clock, DollarSign, Filter, Info, Search, Shield, Trash2, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"

interface Notification {
  id: string
  type: "payment" | "access" | "system" | "security"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  actionText?: string
  icon: React.ReactNode
}

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
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
            type: "payment",
            title: "Payment Released",
            message: "50% payment for Netflix Premium subscription has been released from escrow.",
            timestamp: "2025-05-14T10:30:00Z",
            read: false,
            actionUrl: "/splits/split_123",
            actionText: "View Details",
            icon: <DollarSign className="h-5 w-5 text-green-500" />,
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
            icon: <Clock className="h-5 w-5 text-blue-500" />,
          },
          {
            id: "notif_3",
            type: "system",
            title: "System Maintenance",
            message: "neXplit will undergo scheduled maintenance on May 20, 2025, from 2:00 AM to 4:00 AM UTC.",
            timestamp: "2025-05-12T09:15:00Z",
            read: true,
            icon: <Info className="h-5 w-5 text-yellow-500" />,
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
            icon: <Shield className="h-5 w-5 text-purple-500" />,
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
            icon: <Wallet className="h-5 w-5 text-green-500" />,
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
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    // Filter by tab
    if (activeTab !== "all" && notif.type !== activeTab) return false

    // Filter by search query
    if (
      searchQuery &&
      !notif.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notif.message.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  const unreadCount = notifications.filter((notif) => !notif.read).length

  if (!user) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view notifications</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your notifications.</p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your account activity</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="access">Access</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <NotificationsList
              notifications={filteredNotifications}
              isLoading={isLoading}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="payment" className="mt-0">
            <NotificationsList
              notifications={filteredNotifications}
              isLoading={isLoading}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="access" className="mt-0">
            <NotificationsList
              notifications={filteredNotifications}
              isLoading={isLoading}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="system" className="mt-0">
            <NotificationsList
              notifications={filteredNotifications}
              isLoading={isLoading}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <NotificationsList
              notifications={filteredNotifications}
              isLoading={isLoading}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function NotificationsList({
  notifications,
  isLoading,
  onMarkAsRead,
  onDelete,
}: {
  notifications: Notification[]
  isLoading: boolean
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No notifications</h3>
          <p className="text-muted-foreground">You don't have any notifications at the moment.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`transition-colors ${notification.read ? "bg-card" : "bg-primary/5 border-primary/20"}`}
        >
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="mt-1">{notification.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                  {notification.actionUrl && (
                    <Button variant="link" size="sm" asChild className="h-auto p-0">
                      <Link href={notification.actionUrl}>{notification.actionText}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
