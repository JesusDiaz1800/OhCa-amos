import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8"
        >
          {children}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout
