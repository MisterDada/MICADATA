import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const TITLES: Record<string, string> = {
  '/': 'MiCA-DATA — Pan-African Data Intelligence Layer',
  '/products': 'Products — MiCA-DATA',
  '/pricing': 'Pricing — MiCA-DATA',
  '/about': 'About Us — MiCA-DATA',
}

/** Global layout wrapper: fixed nav, routed content, footer. */
export function SiteLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/']
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
