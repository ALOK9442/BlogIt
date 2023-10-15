import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { set, useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import Button from './headers/Button'

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError = ""
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const user = await authService.getCurrentUser()
                if (user) {
                    dispatch(login(user))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        sign in
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center" >{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            type="text"
                            className=""
                            placeholder="Enter your Full Name"
                            {
                            ...register("name", {
                                required: true,
                                // validate: 
                            }
                            )
                            }
                        />
                        <Input
                            label="email"
                            type ="email"
                            className = ""
                            placeholder = "enter your email"
                            {
                                ...register ("email",{
                                    required:true,
                                    validate: {matchPattern : (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Enter a valid email address"
                                    }
                                })
                            }
                        />
                        <Input
                           label = "password"
                           type = "password"
                           placeholder="enter your password"
                           className=""
                           {
                            ...register ("password",{
                                required :true,
                                validate:{
                                    matchPattern :(value)=>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)||
                                    "at least 8 characters-must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters"
                                }
                            })
                           }
                        />
                        <Button 
                        type='submit'
                        className='w-full'
                        >SignUp</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp