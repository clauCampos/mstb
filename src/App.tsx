import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsListPage from './pages/ProductsListPage'
import ProductInfoPage from './pages/ProductInfoPage'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/products' element={<ProductsListPage />} />
          <Route path='/products/:id' element={<ProductInfoPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
