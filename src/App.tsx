import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Landing from './pages/Landing'
import LearnLayout from './pages/LearnLayout'
import Dashboard from './pages/Dashboard'
import LessonPage from './pages/LessonPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/learn" element={<LearnLayout />}>
          <Route index element={<Dashboard />} />
          <Route path=":course/:lesson" element={<LessonPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
