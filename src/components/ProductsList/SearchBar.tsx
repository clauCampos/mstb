import CloseIcon from '../Ui/Icons/CloseIcon'
import useSearchBar from './hooks/useSearchBar'
import './styles/SeachBarStyles.scss'

export default function SearchBar() {
  const { inputValue, handleInputChange, handleClearInput } = useSearchBar()

  return (
    <div className='search-bar-container'>
      <div className='input-wrapper'>
        <input
          id='search-input'
          data-testid='search-input'
          type='text'
          className='search-input'
          placeholder='Search for a smartphone...'
          autoComplete='off'
          value={inputValue}
          onChange={handleInputChange}
        />

        {inputValue && (
          <div className='close-btn-wrapper'>
            <button
              data-testid='clear-input-button'
              onClick={handleClearInput}
              className='close-btn'
            >
              <CloseIcon className='close-btn-icon' />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
