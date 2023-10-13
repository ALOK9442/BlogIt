import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import './App.css'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import { Footer, Headers } from './components'

function App() {
  const [Loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])


  return !Loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Headers />
        <Footer />
      </div>
    </div>
  ) : <h1>loading.......</h1>
}

export default App
