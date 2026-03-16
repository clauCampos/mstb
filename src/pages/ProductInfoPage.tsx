import Layout from '../components/Ui/Layout/Layout'
import ProductInfo from '../components/ProductInfo/ProductInfo'
import { ProductDetailProvider } from '../context/ProductDetailContext'
import './styles/ProductDetailPageStyles.scss'

export default function ProductDetailPage() {
  return (
    <ProductDetailProvider>
      <Layout>
        <div className='details-page-container'>
          <ProductInfo />
        </div>
      </Layout>
    </ProductDetailProvider>
  )
}
