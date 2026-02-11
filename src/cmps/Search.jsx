import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user/user.service.local.js'
import { loadSearchUsers, clearSearchUsers } from '../store/actions/user.actions.js'
import { debounce } from "../services/util.service.js"
import { UserList } from './UserList.jsx'
import { SearchBar } from './SearchBar.jsx'
import { useMediaQuery } from "../customHooks/useMediaQuery.js"

export function Search({ onClose = () => { }, btnRef = null }) {
    const isMobile = useMediaQuery("(max-width: 767px)")
    const navigate = useNavigate()

    const ref = useRef(null)
    const inputRef = useRef(null)

    const [txt, setTxt] = useState('')
    const [openSearchList, setOpenSearchList] = useState(false)

    const searchUsers = useSelector(state => state.userModule.searchUsers)

    const debouncedLoadUsers = useRef(
        debounce(filterBy => loadSearchUsers(filterBy), 400)
    ).current

    useEffect(() => {
        return () => {
            debouncedLoadUsers.cancel?.()
        }
    }, [])

    useEffect(() => {
        function handleClickOutside(ev) {
            if (!ref.current) return
            if (btnRef?.current?.contains(ev.target)) return
            if (ref.current.contains(ev.target)) return

            if (isMobile) {
                setOpenSearchList(false)
            } else {
                onClose()
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [isMobile, onClose])

    useEffect(() => {
        if (isMobile) {
            setOpenSearchList(!!txt.trim())
        }

        if (!txt.trim()) {
            clearSearchUsers()
            debouncedLoadUsers.cancel?.()
            return
        }
        debouncedLoadUsers({ txt })
    }, [txt])


    function handleChange(ev) {
        const value = ev.target.value
        setTxt(value)
    }

    function handleFocus() {
        if (isMobile && txt.trim()) {
            setOpenSearchList(true)
            console.log('openList');
        }
    }

    function onUserDetails(userId, username) {
        navigate(`/${username}`, {
            state: {
                userId
            }
        })
        onClose()
    }

    return isMobile ?
        (
            <section className="search search-mobile" ref={ref}>

                <SearchBar txt={txt} onChange={handleChange} onFocus={handleFocus} inputRef={inputRef} />

                {openSearchList && <UserList users={searchUsers} onDetails={onUserDetails} />}

            </section >
        )
        :
        (
            <section className="search search-desktop" ref={ref}>

                <div className='title'>Search</div >

                <SearchBar txt={txt} onChange={handleChange} />

                <UserList users={searchUsers} onDetails={onUserDetails} />

            </section >
        )
}

