
export function SearchBar({ txt, onChange, inputRef = null }) {

    return (
        <div className='search-bar'>
            <input
                ref={inputRef}
                type="text"
                name='text'
                value={txt}
                onChange={onChange}
                autoComplete="off"
                placeholder='Search' />
        </div>
    )

}