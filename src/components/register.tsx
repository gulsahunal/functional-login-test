import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Check, Loader2 } from "lucide-react"

interface RegisterProps {
  onRegister: (email: string, password: string) => void
}

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "At least 3 characters")
      .max(20, "Less than 20 characters")
      .regex(/^[a-zA-Z0-9_.-]+$/, "Only letters, numbers, underscores, dashes and periods"),
    email: z
      .string()
      .email("Invalid email address"),
    
    dob: z.date({
      required_error: "Date of birth is required",
    }),
    
    password: z
      .string()
      .min(8, "At least 8 characters"),
    
    confirmPassword: z
      .string()
      .min(8, "Please confirm your password"),
  })
  .refine(
    (data) => data.password === data.confirmPassword, 
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  )

const years = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 }, 
  (_, i) => 1900 + i
).reverse()

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate()
}

type FormValues = {
  username: string;
  email: string;
  dob: Date;
  password: string;
  confirmPassword: string;
}

export function Register({ onRegister }: RegisterProps) {
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = React.useState<number>(1)
  const [selectedMonth, setSelectedMonth] = React.useState<number>(0)
  const [selectedYear, setSelectedYear] = React.useState<number>(2000)
  const [value, setValue] = React.useState("")
  const [isEmailVerified, setIsEmailVerified] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [showVerifyError, setShowVerifyError] = React.useState(false)
  const [openVerifyDialog, setOpenVerifyDialog] = React.useState(false)

  // New states for OTP verification process
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [isVerified, setIsVerified] = React.useState(false)

  // New state for displaying a successful registration alert.
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false)

  // New state for the loading indicator
  const [isLoading, setIsLoading] = React.useState(false)

  // Reset verifying states every time the dialog is reopened
  React.useEffect(() => {
    if (openVerifyDialog) {
      setIsVerifying(false)
      setIsVerified(false)
      setValue("")
    }
  }, [openVerifyDialog])

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob: undefined,
    },
  })

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handleSubmit = (data: z.infer<typeof registerSchema>) => {
    if (!isEmailVerified) {
      setErrorMessage("Please verify your email")
      return
    }
    try {
      setErrorMessage(null)
      // Set the register button to loading state
      setIsLoading(true)

      // Simulate a 2-second loading delay before processing registration
      setTimeout(() => {
        // Call the provided onRegister method
        onRegister(data.email, data.password)
        // Show the success alert
        setShowSuccessAlert(true)
        // Remove the loading state from the button
        setIsLoading(false)
        
        // Navigate to the home page after showing the alert for 2 seconds
        setTimeout(() => {
          navigate("/")
        }, 2000)
      }, 2000)
    } catch (error) {
      console.error("Validation error:", error)
      // Ensure the button is not stuck in loading state on error
      setIsLoading(false)
    }
  }

  const handleOTPVerify = () => {
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      setIsVerifying(true)
      setShowVerifyError(false)
      setTimeout(() => {
        setIsVerifying(false)
        setIsVerified(true)
        setIsEmailVerified(true)
        setTimeout(() => {
          setValue("")
          setOpenVerifyDialog(false)
        }, 1000)
      }, 2000)
    } else {
      setShowVerifyError(true)
    }
  }

  return (
    <>
      {showSuccessAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert className="bg-green-500 text-white shadow-lg">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Successfully registered.</AlertDescription>
          </Alert>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
          <div className={cn("flex flex-col gap-3")}>
            <Card className="min-w-[400px]">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Register</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }: { field: ControllerRenderProps<FormValues, "username"> }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" placeholder="johndoe123" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }: { field: ControllerRenderProps<FormValues, "email"> }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <div className="flex w-full max-w-sm items-center space-x-2">
                              <Input
                                {...field}
                                id="email"
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                placeholder="name@example.com"
                                disabled={isEmailVerified}
                                onChange={(e) => {
                                  field.onChange(e)
                                  setIsEmailVerified(false)
                                  setShowVerifyError(false)
                                }}
                              />
                              <Dialog open={openVerifyDialog} onOpenChange={setOpenVerifyDialog}>
                                <DialogTrigger asChild>
                                  <Button
                                    disabled={
                                      isEmailVerified ||
                                      (!field.value || !!form.formState.errors.email)
                                    }
                                    className={cn(
                                      showVerifyError && "bg-red-500 hover:bg-red-600 text-white"
                                    )}
                                    onClick={() => setOpenVerifyDialog(true)}
                                  >
                                    {isEmailVerified ? "Verified" : "Verify"}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center gap-6">
                                  <DialogHeader>
                                    <DialogTitle className="text-center w-full">
                                      Verify Your Email
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="flex items-center justify-center space-x-2">
                                    <InputOTP
                                      maxLength={6}
                                      value={value}
                                      onChange={(v) => setValue(v)}
                                    >
                                      <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                      </InputOTPGroup>
                                      <InputOTPSeparator />
                                      <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                      </InputOTPGroup>
                                    </InputOTP>
                                    <Button
                                      type="button"
                                      onClick={handleOTPVerify}
                                      size="sm"
                                      className={cn(
                                        "flex items-center justify-center",
                                        isVerified ? "w-fit px-3" : "size-9"
                                      )}
                                      disabled={isVerifying}
                                    >
                                      {isVerifying ? (
                                        <Loader2 className="animate-spin" />
                                      ) : isVerified ? (
                                        "Verified"
                                      ) : (
                                        <Check />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="text-center text-sm">
                                    {showVerifyError ? (
                                      <span className="text-red-500">Please enter 6 digits</span>
                                    ) : (
                                      value === "" ? (
                                        <>Enter your OTP code</>
                                      ) : (
                                        <>You entered: {value}</>
                                      )
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <div className="flex gap-2">
                            <select
                              {...field}
                              className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>option]:text-black ${
                                selectedDay !== 1 ? "text-black" : "text-gray-500"
                              }`}
                              value={selectedDay}
                              onChange={(e) => {
                                const day = Number.parseInt(e.target.value)
                                setSelectedDay(day)
                                field.onChange(new Date(selectedYear, selectedMonth, day))
                              }}
                            >
                              {days.map((day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              ))}
                            </select>
                            <select
                              {...field}
                              className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>option]:text-black ${
                                selectedMonth !== 0 ? "text-black" : "text-gray-500"
                              }`}
                              value={selectedMonth}
                              onChange={(e) => {
                                const month = Number.parseInt(e.target.value)
                                setSelectedMonth(month)
                                const newDay = Math.min(selectedDay, getDaysInMonth(month, selectedYear))
                                field.onChange(new Date(selectedYear, month, newDay))
                              }}
                            >
                              {months.map((month, index) => (
                                <option key={month} value={index}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            <select
                              {...field}
                              className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>option]:text-black ${
                                selectedYear !== 2000 ? "text-black" : "text-gray-500"
                              }`}
                              value={selectedYear}
                              onChange={(e) => {
                                const year = Number.parseInt(e.target.value)
                                setSelectedYear(year)
                                const newDay = Math.min(selectedDay, getDaysInMonth(selectedMonth, year))
                                field.onChange(new Date(year, selectedMonth, newDay))
                              }}
                            >
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }: { field: ControllerRenderProps<FormValues, "password"> }) => (
                        <FormItem>
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              id="password"
                              type="password" 
                              autoComplete="new-password"
                              placeholder="Enter your password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }: { field: ControllerRenderProps<FormValues, "confirmPassword"> }) => (
                        <FormItem>
                          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              id="confirmPassword"
                              type="password" 
                              autoComplete="new-password"
                              placeholder="Confirm your password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="animate-spin" /> : "Register"}
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <button 
                      type="button"
                      onClick={() => navigate("/")} 
                      className="underline underline-offset-4"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>

      <AlertDialog 
        open={!!errorMessage} 
        onOpenChange={(open) => {
          if (!open) setErrorMessage(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setErrorMessage(null)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
