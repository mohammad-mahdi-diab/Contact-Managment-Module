import "@/assets/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ToastContainer } from 'react-toastify'
import AuthProvider from "@/components/AuthProvider"
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'Contact Module Managment',
  description: 'Find public contacts easily',
  keywords: 'Contact, Find contacts',
}

const RootLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}

export default RootLayout