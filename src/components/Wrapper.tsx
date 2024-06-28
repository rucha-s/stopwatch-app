import React, { PropsWithChildren } from 'react'
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
 
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

const Wrapper: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <div className={`${inter.variable} ${robotoMono.variable}`}>
      {children}
    </div>
  )
}

export default Wrapper