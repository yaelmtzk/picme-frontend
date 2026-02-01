import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user/user.service.local.js'
import { loadUsers, clearUsers } from '../store/actions/user.actions.js'
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
    const [filterBy, setFilterBy] = useState(userService.getDefaultFilter())
    const [openSearchList, setOpenSearchList] = useState(false)

    const debouncedLoadUsers = useRef(debounce(loadUsers, 400)).current

    const users = useSelector(storeState => storeState.userModule.users)

    // useEffect(() => {
    //     clearUsers()
    //     debouncedLoadUsers.cancel?.()
    // }, [])



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


    // useEffect(() => {
    //     if (isMobile) {
    //         setOpenSearchList(!!txt.trim())
    //     }

    //     if (!txt.trim()) {
    //         clearUsers()
    //         debouncedLoadUsers.cancel?.()
    //         return
    //     }

    //     debouncedLoadUsers(filterBy)
    // }, [filterBy, txt, isMobile])

    useEffect(() => {
        if (isMobile) {
            setOpenSearchList(!!txt.trim())
        }

        if (!txt.trim()) {
            debouncedLoadUsers.cancel?.()
            return
        }

        debouncedLoadUsers(filterBy)

    }, [filterBy, txt])


    function handleChange(ev) {
        const value = ev.target.value

        setTxt(value)

        setFilterBy(prev => ({
            ...prev,
            username: value
        }))
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

                <SearchBar txt={txt} onChange={handleChange} inputRef={inputRef} />

                {openSearchList && <UserList users={users} onDetails={onUserDetails} />}

            </section >
        )
        :
        (
            <section className="search search-desktop" ref={ref}>

                <div className='title'>Search</div >

                <SearchBar txt={txt} onChange={handleChange} />

                <UserList users={users} onDetails={onUserDetails} />

            </section >
        )
}

