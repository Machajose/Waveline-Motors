import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Header from "./Header"
import Footer from "./Footer"
import PageTransition from "./PageTransition"
import ChatWidget from "../chat/ChatWidget"
import AmbientBackground from "./AmbientBackground"
import ScrollProgressBar from "./ScrollProgressBar"

export default function PublicLayout() {
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgressBar />
      <AmbientBackground />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}