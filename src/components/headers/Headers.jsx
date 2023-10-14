import React from 'react'
import { logoutBtn, Logo, container } from "../index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Headers = () => {

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },

    ]


    return (
        <Headers className='py-3 shadow bg-gray-500'>
            <container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <link to='/'>
                            <Logo width = '70px' />
                        </link>
                    </div>
                    <ul className='flex ml-auto'>
                    {
                        navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                            <button onClick={()=>navigate(item.slug)}
                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                            >
                            {item.name}
                            </button>
                            </li>
                        ):null
                        )
                    }
                    {authStatus&&(
                        <li>
                            <logoutBtn/>
                        </li>
                    )}
                    </ul>
                </nav>
            </container>
        </Headers>
    )
}

export default Headers