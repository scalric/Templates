import { useState, type FormEvent } from 'react'
import { Info, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { authStore } from '../lib/authStore'

const field = 'mt-1.5 h-12 w-full rounded-xl border-0 bg-white px-4 text-[15px] shadow-soft ring-1 ring-inset ring-ink/10 placeholder:text-ink-soft/50 focus:ring-2 focus:ring-brand-600'

export default function SignInPage() {
  useDocumentTitle('Sign in')
  const user = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    authStore.signIn(email)
    navigate('/my-designs')
  }

  return (
    <div className="container-page flex justify-center py-16 lg:py-24">
      <div className="w-full max-w-md">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">{user ? `Hi, ${user.name}` : 'Welcome back'}</h1>
        <p className="mt-2 text-ink-soft">{user ? 'You are signed in on this browser.' : 'Sign in to keep your designs together.'}</p>

        {user ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/my-designs" className="flex-1">Go to my designs</Button>
            <Button variant="secondary" onClick={() => authStore.signOut()} leftIcon={<LogOut size={16} />}>Sign out</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
              <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={field} />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-ink">Password</label>
              <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className={field} />
            </div>
            {error && <p role="alert" className="text-sm font-medium text-brand-700">{error}</p>}
            <Button type="submit" size="lg" className="w-full">Sign in</Button>
            <p className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-sm text-ink-soft ring-1 ring-ink/10">
              <Info size={16} className="mt-0.5 shrink-0 text-brand-600" />
              Demo sign-in: any email and a 6+ character password works. Nothing is sent to a server.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
