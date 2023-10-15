import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Input, Button, Logo } from './index'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin} from '../store/authSlice'

function Login() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            } else {

            }

        } catch (error) {

        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            </div>
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className=''>
                    <Input
                        label='email'
                        placeholder='enter your email'
                        type='email'
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "enter a valid email address"
                            }
                        })}
                    />
                    <Input
                        label="password"
                        type="password"
                        placeholder="enter your password"
                        {...register("password", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                                    "at least 8 characters-must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters"
                            }
                        })}
                    />
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        signIn
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login