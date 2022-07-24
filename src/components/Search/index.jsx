import React from 'react';
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'

import './search.scss';

const Search = () => {
    const inputRef  = React.useRef();
    const [value, setValue] = React.useState('')
    const { setSearchValue} = React.useContext(SearchContext)
    
    const onClearSearch = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
    }

    const updateSearch = React.useCallback( 
        debounce((inputValue) => {
            setSearchValue(inputValue)
        }, 250), [])

        const onChangeValue = (event) => {
            setValue(event.target.value)
            updateSearch(event.target.value)
        }

    return (
        <div className='root'>
            <svg className='icon' fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
            <input 
            ref = {inputRef}
            value={value} onChange={onChangeValue} className="input-search" placeholder='Поиск вашей любимой пиццы...' />
            { value && (<svg onClick={() => onClearSearch()} className="clear-input-icon" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>)}
        </div>
    )
}

export default Search