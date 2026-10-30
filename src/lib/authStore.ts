/**
 * Demo-only auth: remembers a display name + email in localStorage so the UI
 * can show a signed-in state. There is NO real authentication or server —
 * replace this module with a real provider when a backend exists.
 */
export interface User {
  name: string
  email: string
}

const KEY = 'sitecraft.user.v1'
let cache: User | null | undefined
const listeners = new Set<() => void>()

function read(): User | null {
  if (cache !== undefined) return cache
  try {
    const raw = localStorage.getItem(KEY)
    cache = raw ? (JSON.parse(raw) as User) : null
  } catch {
    cache = null
  }
  return cache
}

function write(next: User | null): void {
  cache = next
  try {
    if (next) localStorage.setItem(KEY, JSON.stringify(next))
    else localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      cache = undefined
      listeners.forEach((l) => l())
    }
  })
}

const nameFromEmail = (email: string): string => {
  const local = email.split('@')[0].replace(/[._-]+/g, ' ').trim()
  return local ? local.replace(/\b\w/g, (c) => c.toUpperCase()) : 'there'
}

export const authStore = {
  subscribe(l: () => void): () => void {
    listeners.add(l)
    return () => listeners.delete(l)
  },
  getUser: read,
  signIn(email: string): User {
    const user = { email: email.trim(), name: nameFromEmail(email) }
    write(user)
    return user
  },
  signOut(): void {
    write(null)
  },
}
