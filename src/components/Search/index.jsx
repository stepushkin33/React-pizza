import React from 'react';

import './search.scss';

const Search = ({ searchValue, setSearchValue }) => {
    return (
        <div className='root'>
            <svg className='icon' fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
            <input onChange={(event => setSearchValue(event.target.value))} className="input-search" placeholder='Поиск вашей любимой пиццы...' value={searchValue}/>
            { searchValue && (<svg onClick={() => setSearchValue('')} className="clear-input-icon" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>)}
        </div>
    )
}

export default Search