import { ProductsProvider } from '../context/ProductsContext'
import ProductsList from '../components/ProductsList/ProductsList'
import Layout from '../components/Ui/Layout/Layout'
import './styles/ProductsListPageStyles.scss'

export default function ProductsListPage() {
  return (
    <ProductsProvider>
      <Layout>
        <div className='products-list-page-container'>
          <ProductsList />
        </div>
      </Layout>
    </ProductsProvider>
  )
}
