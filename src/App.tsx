import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import TemplatesPage from './pages/TemplatesPage'

// Heavier / secondary pages are code-split.
const TemplateDetailsPage = lazy(() => import('./pages/TemplateDetailsPage'))
const MyDesignsPage = lazy(() => import('./pages/MyDesignsPage'))
const EditorPage = lazy(() => import('./pages/EditorPage'))
const PublishedSitePage = lazy(() => import('./pages/PublishedSitePage'))
const SignInPage = lazy(() => import('./pages/SignInPage'))
const FullPagePreviewPage = lazy(() => import('./pages/FullPagePreviewPage'))

function PageLoader() {
  return <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500" role="status">Loading…</div>
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Site pages share the navbar + footer */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="templates/:slug" element={<TemplateDetailsPage />} />
          <Route path="my-designs" element={<MyDesignsPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* The editor is full-screen, outside the marketing layout */}
        <Route path="editor" element={<Navigate to="/templates" replace />} />
        <Route path="editor/:designId" element={<EditorPage />} />
        <Route path="site/:designId" element={<PublishedSitePage />} />
        <Route path="templates/:slug/full" element={<FullPagePreviewPage />} />
      </Routes>
    </Suspense>
  )
}
