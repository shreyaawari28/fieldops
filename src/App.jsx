import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DPRForm from './pages/DPRForm.jsx'
import Login from './pages/Login.jsx'
import ProjectList from './pages/ProjectList.jsx'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}
const MotionDiv = motion.div

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-light-bg text-dark transition-colors duration-300 dark:bg-dark dark:text-gray-300">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#242424',
            color: '#F9F6F0',
            border: '1px solid rgba(245, 168, 0, 0.25)',
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <MotionDiv {...pageTransition} transition={{ duration: 0.35 }}>
                <Login />
              </MotionDiv>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <MotionDiv
                  {...pageTransition}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectList />
                </MotionDiv>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dpr/:projectId"
            element={
              <ProtectedRoute>
                <MotionDiv
                  {...pageTransition}
                  transition={{ duration: 0.35 }}
                >
                  <DPRForm />
                </MotionDiv>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
