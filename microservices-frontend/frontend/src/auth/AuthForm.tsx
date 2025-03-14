import type React from "react"
import { useState } from "react"
import authService from "./authService"

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 grid w-full grid-cols-2 overflow-hidden rounded-lg bg-white">
          <button
            onClick={() => setActiveTab("login")}
            className={`py-3 font-medium transition-colors ${
              activeTab === "login" ? "bg-[#222222] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`py-3 font-medium transition-colors ${
              activeTab === "register" ? "bg-[#222222] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}

function LoginForm() {
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await authService.login({ userName, password })
      window.location.href = "/"
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800">Login</h2>
        <p className="mt-1 text-sm text-gray-500">Enter your credentials to access your account</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username or Email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222]"
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-[#222222] hover:text-[#222222]">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222]"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-md bg-[#222222] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#222222] focus:outline-none focus:ring-2 focus:ring-[#222222] focus:ring-offset-2 ${
              isLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  )
}

function RegisterForm() {
  const [userName, setUserName] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await authService.register({ userName, firstName, lastName, email, password })
      window.location.href = "/login"
    } catch (err: any) {
      setError(err.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800">Create an account</h2>
        <p className="mt-1 text-sm text-gray-500">Enter your information to create a new account</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="register-username" className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="register-username"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="mb-1 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222]"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="mb-1 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222]"
            />
          </div>

          <div>
            <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222]"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-md bg-[#222222] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#222222] focus:outline-none focus:ring-2 focus:ring-[#222222] focus:ring-offset-2 ${
              isLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  )
}
