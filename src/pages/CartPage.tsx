import ShoppingCart from '../components/ShoppingCart/ShoppingCart'
import Layout from '../components/Ui/Layout/Layout'
import './styles/CartPageStyles.scss'

export default function CartPage() {
  return (
    <Layout>
      <div className='cart-page-container'>
        <ShoppingCart />
      </div>
    </Layout>
  )
}
