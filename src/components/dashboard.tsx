import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCallback, useEffect, useState } from "react"
import { Sun, Sunset, Moon } from "lucide-react"

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [greeting, setGreeting] = useState("")
  const [icon, setIcon] = useState(<Sun />)

  // getRemainingTime fonksiyonunu useCallback ile sarmalayarak bağımlılıkları kontrol altına alıyoruz.
  const getRemainingTime = useCallback(() => {
    const expiresAtStr = localStorage.getItem("sessionExpiresAt")
    if (!expiresAtStr) return 0
    const expiresAt = Number.parseInt(expiresAtStr, 10)
    return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
  }, [])

  const [counter, setCounter] = useState(getRemainingTime())

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning")
      setIcon(<Sun className="size-4" />)
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon")
      setIcon(<Sun className="size-4" />)
    } else if (hour >= 17 && hour < 22) {
      setGreeting("Good Evening")
      setIcon(<Sunset className="size-4" />)
    } else {
      setGreeting("Good Night")
      setIcon(<Moon className="size-4" />)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getRemainingTime()
      if (remaining <= 0) {
        onLogout() // Sayaç 0'a ulaştığında çıkış yap
        clearInterval(timer)
        setCounter(0)
      } else {
        setCounter(remaining)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [getRemainingTime, onLogout])

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="min-w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Dashboard
          </CardTitle>
          <CardDescription className="flex items-center justify-center gap-2">
            {icon}
            {greeting}
          </CardDescription>
          <div className="text-xs text-muted-foreground">
            Oturum süresi: {counter} saniye
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Stats Section */}
            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-3 gap-2">
                <Card className="rounded-lg border-none bg-blue-50 hover:bg-blue-100 transition-colors">
                  <CardContent className="pt-4 flex flex-col items-center">
                    <div className="p-2 rounded-full bg-blue-500/10 mb-1">
                      <svg className="size-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Active Projects</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-blue-700">28</div>
                    <p className="text-sm text-blue-600/80">Projects</p>
                  </CardContent>
                </Card>
                <Card className="rounded-lg border-none bg-green-50 hover:bg-green-100 transition-colors">
                  <CardContent className="pt-4 flex flex-col items-center">
                    <div className="p-2 rounded-full bg-green-500/10 mb-1">
                      <svg className="size-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Total Revenue</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-green-700">$2,450</div>
                    <p className="text-sm text-green-600/80">Revenue</p>
                  </CardContent>
                </Card>
                <Card className="rounded-lg border-none bg-purple-50 hover:bg-purple-100 transition-colors">
                  <CardContent className="pt-4 flex flex-col items-center">
                    <div className="p-2 rounded-full bg-purple-500/10 mb-1">
                      <svg className="size-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Total Users</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-purple-700">1,234</div>
                    <p className="text-sm text-purple-600/80">Users</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      user: "Alex Morgan",
                      action: "created a new project",
                      time: "2 hours ago",
                      type: "project"
                    },
                    {
                      id: 2,
                      user: "Sarah Chen", 
                      action: "added 3 new tasks",
                      time: "5 hours ago",
                      type: "task"
                    },
                    {
                      id: 3,
                      user: "John Smith",
                      action: "completed payment",
                      time: "1 day ago",
                      type: "payment"
                    },
                    {
                      id: 4,
                      user: "Emma Wilson",
                      action: "left a comment",
                      time: "2 days ago",
                      type: "comment"
                    }
                  ].map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="pt-1">
                        {activity.type === "project" && (
                          <svg className="size-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <title>New Project Icon</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {activity.type === "task" && (
                          <svg className="size-5 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <title>Task Update Icon</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        )}
                        {activity.type === "payment" && (
                          <svg className="size-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <title>Payment Icon</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {activity.type === "comment" && (
                          <svg className="size-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <title>Comment Icon</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1 text-sm">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-muted-foreground">{activity.action}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Logout Button */}
            <Button 
              variant="outline" 
              className="w-full rounded-none"
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
