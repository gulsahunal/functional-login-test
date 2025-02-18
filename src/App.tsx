import { Login } from "@/components/login"
import { Register } from "@/components/register"
import { Dashboard } from "@/components/dashboard"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Rabbit } from "lucide-react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // Uygulama açıldığında localStorage'daki giriş durumunu kontrol et
  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (usernameOrEmail: string, password: string) => {
    // For demo purposes, let's accept any valid format credentials
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail)
    const isValidUsername = /^[a-zA-Z0-9_.-]{3,20}$/.test(usernameOrEmail)
    
    if ((isEmail || isValidUsername) && password.length >= 8) {
      localStorage.setItem("loggedIn", "true")
      // Session expires after 60 seconds (60000 ms)
      localStorage.setItem("sessionExpiresAt", (Date.now() + 60000).toString())
      setIsLoggedIn(true)
      navigate("/dashboard")
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("sessionExpiresAt")
    setIsLoggedIn(false)
    navigate("/")
  }

  const handleRegister = (_email: string, _password: string) => {
    // Registration logic burada yer alıyor, navigate("/") çağrısı kaldırıldı
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {/* Header */}
      <div className="flex w-full max-w-sm flex-col gap-6 font-medium text-[#7d89ff]">
        <a
          href="https://github.com/gulsahunal/functional-login-test"
          className="flex items-center gap-2 self-center">
          <div className="flex size-5 items-center justify-center rounded-md">
            <Rabbit className="size-5" />
          </div>
          Functional Login Test
        </a>
      </div>
      <Routes>
        {[
          {
            path: "/",
            element: isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            ),
          },
          {
            path: "/register",
            element: <Register onRegister={handleRegister} />,
          },
          {
            path: "/dashboard",
            element: isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            ),
          },
        ].map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </div>
  )
}

export default App