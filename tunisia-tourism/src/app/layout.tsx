import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tunisia Tourism 2.0',
  description: 'Discover Tunisia like never before',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  )
}