import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { scrollToTop } from '../../lib/scroll'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/** Jumps to the top on every page change. Instant, because the site's smooth scrolling would animate from the footer. */
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    scrollToTop()
  }, [pathname, search])
  return null
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg">Skip to content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
