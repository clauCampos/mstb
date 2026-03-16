import AppHeader from './AppHeader'
import type { LayoutTypes } from './types/LayoutTypes'
import './styles/LayoutStyles.scss'

export default function Layout({ children }: LayoutTypes) {
  return (
    <div className='layout-container'>
      <AppHeader />

      <main>{children}</main>
    </div>
  )
}
