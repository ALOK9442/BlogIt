import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'

const logoutBtn = () => {

    const dispatch = useDispatch()

    const logoutHandler = (e) => {
        authService.logout().then(() => {
            dispatch(logout())
        })
            .catch(error=>
        {
            console.log(error)
        })
    }


    return (
        <button>Logout</button>
    )
}

export default logoutBtn