import type { ReactNode } from 'react'
import CardsProvider from './components/base-org/Card/context.tsx'
import ThemeProvider from './contexts/Theme.tsx'  
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div 
      className="vocs-layout antialiased" 
      style={{ 
        fontFamily: 'CoinbaseSans !important'
      }}
    >
      <ThemeProvider>
        <CardsProvider>
          {children}
        </CardsProvider>
      </ThemeProvider>
    </div>
  )
} 