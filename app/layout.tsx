import './globals.css'
import { Josefin_Sans } from 'next/font/google'
import NavBar from '@/components/navbar/NavBar'
import Footer from '@/components/footer/Footer'

const josefinsans = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'LOCAL FOOD-EXPRESS',
  description: 'Get Your Intercontinental Dishes Delivered In No TIme',
  icons:{
    icon: '/icon.png'
  }
  }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={josefinsans.className}>
        <NavBar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
