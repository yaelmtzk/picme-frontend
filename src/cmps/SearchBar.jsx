
export function SearchBar({ txt, onChange, inputRef = null, onFocus}) {
    return (
        <div className='search-bar'>
            <input
                ref={inputRef}
                type="text"
                name='text'
                value={txt}
                onChange={onChange}
                onFocus={onFocus}
                autoComplete="off"
                placeholder='Search' />
        </div>
    )
}