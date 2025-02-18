import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface LoginProps {
  onLogin: (usernameOrEmail: string, password: string) => void
}

const FormSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, "At least 3 characters")
    .refine((value) => {
      // Check if it's a valid email or username
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const usernameRegex = /^[a-zA-Z0-9_.-]{3,20}$/
      return emailRegex.test(value) || usernameRegex.test(value)
    }, "Invalid email or username format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
})

type FormValues = z.infer<typeof FormSchema>

export function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate()
  const [showError, setShowError] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  })

  const handleSubmit = async (data: FormValues) => {
    // Validate email/username format
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.usernameOrEmail)
    const isValidUsername = /^[a-zA-Z0-9_.-]{3,20}$/.test(data.usernameOrEmail)

    if (!isEmail && !isValidUsername) {
      setShowError(true)
      return
    }

    try {
      await onLogin(data.usernameOrEmail, data.password)
    } catch {
      setShowError(true)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
          <div className={cn("flex flex-col gap-3")}>
            <Card className="min-w-[400px]">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">
                  Welcome
                </CardTitle>
                <CardDescription>
                  Login with your existing account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="usernameOrEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="usernameOrEmail">Email or Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="usernameOrEmail"
                              type="text"
                              placeholder="Enter your email or username"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <ForgotPasswordDialog />
                          </div>
                          <FormControl>
                            <Input 
                              {...field}
                              id="password" 
                              type="text"
                              placeholder="Enter your password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <button 
                      type="button"
                      onClick={() => navigate("/register")} 
                      className="underline underline-offset-4"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      
      <AlertDialog open={showError} onOpenChange={setShowError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Failed</AlertDialogTitle>
            <AlertDialogDescription>
              Email or password is incorrect. Please try again
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end">
            <AlertDialogAction>Continue</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function ForgotPasswordDialog() {
  const FormSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  type FormValues = z.infer<typeof FormSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  // New states for controlling the dialog open state, loading state, success alert,
  // and for switching the button text.
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [showResetSuccess, setShowResetSuccess] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
    // Simulate a 2-second API call delay.
    setTimeout(() => {
      setIsLoading(false)
      setIsChanged(true) // Change the button text from "Reset Password" to "Changed"
      setShowResetSuccess(true) // Show the success alert
      // After success alert duration (2 seconds), reset the dialog.
      setTimeout(() => {
        setShowResetSuccess(false)
        setOpen(false)
        setIsChanged(false)
      }, 2000)
    }, 2000)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="ml-auto text-sm underline-offset-4 underline"
          >
            Forgot password?
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your new password and confirm it below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : isChanged ? (
                    "Changed"
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {showResetSuccess && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert className="bg-green-500 text-white shadow-lg">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Password resetted successfully.</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  )
}
