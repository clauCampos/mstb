import CaretBackIcon from '../Ui/Icons/CaretBackIcon'
import useDetailsNavigation from './hooks/useDetailsNavigation'
import './styles/DetailsNavigation.scss'

export default function DetailsNavigation() {
  const { handleGoBack } = useDetailsNavigation()

  return (
    <div className='details-navigation-container'>
      <button onClick={handleGoBack} className='details-back-btn'>
        <div className='details-back-btn-icon-wrapper'>
          <CaretBackIcon className='details-back-btn-icon' />
        </div>

        <span className='details-back-btn-text'>Back</span>
      </button>
    </div>
  )
}
