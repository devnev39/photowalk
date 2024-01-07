"use client"

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Nav from '../components/Nav'
import { Inter } from 'next/font/google'
import Footer from "@/components/Footer";
import './globals.css'
import { AuthContextProvider } from '@/config/AuthContext';
import { ErrorContext } from '@/context/ErrorContext';
import Error from '@/components/Error';

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Photowalk',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <ErrorContext>
          <Nav />
            <div className='main'>
              <div className='gradient' />
            </div>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          <Error />
          <Footer />
          </ErrorContext>
        </AuthContextProvider>
      </body>    
    </html>
  )
}
