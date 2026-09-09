import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { Home } from '@/pages/Home'
import { Products } from '@/pages/Products'
import { Pricing } from '@/pages/Pricing'
import { About } from '@/pages/About'
import { NotFound } from '@/pages/NotFound'

/**
 * MiCA-DATA — central router.
 * Strictly 4 core pages (no API docs / demo routes).
 */
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SiteLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'about', element: <About /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
