import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './app.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authslice"
import  Header from './components/header/header'
import  Footer  from './components/footer/footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    // console.log("check")
    .then((userData) => {
      if (userData) {
        // console.log("check")
        dispatch(login({userData}))
      } else {
        dispatch(logout())
        // console.log("check")
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
