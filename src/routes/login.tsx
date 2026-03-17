import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FormEvent, useState } from 'react'
import { signIn, signUp, useSession } from '~/lib/auth-client'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { data: session, refetch } = useSession()
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('password123')
  const [name, setName] = useState('Test User')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    try {
      await signIn.email({
        email,
        password,
      })
      await refetch()
      setMessage('Signed in successfully')
      void navigate({ to: '/protected' })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    setMessage('')
    try {
      await signUp.email({
        email,
        password,
        name,
      })
      await refetch()
      setMessage('Account created successfully')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sign up failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md">
      <h3 className="text-xl font-semibold mb-4">Login</h3>
      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span>Name (for sign up)</span>
          <input
            className="border rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            className="border rounded px-2 py-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Password</span>
          <input
            className="border rounded px-2 py-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="flex gap-2">
          <button
            className="border rounded px-3 py-1"
            type="submit"
            disabled={isLoading}
          >
            Sign In
          </button>
          <button
            className="border rounded px-3 py-1"
            type="button"
            onClick={handleSignUp}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="mt-3">Session: {session ? 'signed in' : 'signed out'}</p>
      {message ? <p className="mt-2">{message}</p> : null}
    </div>
  )
}
