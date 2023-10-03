import Button from '@/components/Button';
import Input from '@/components/Input';
import useMessage from '@/hooks/useMessage';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState, useEffect } from 'react'

interface indexProps { }

const index: FC<indexProps> = ({ }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { setErrorMessage } = useMessage()
    const { user, loading: userLoading, setUser } = useUser()
    const router = useRouter()

    const login = async (e: any) => {
        e.preventDefault()
        let body = { email, password }

        let response = await fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        setLoading(false)
        if (response.status === 500) return setErrorMessage('Internal server error')
        if (response.status === 401 || response.status === 404) return setErrorMessage('Wrong email or Password')
        if (response.status === 200) {
            let data = await response.json()
            setUser(data)
            router.push(`/profile/${data.id}`)
        }
    }

    if (userLoading || user) return <div>...Loading</div>

    if (!user)
        return (
            <div className='flex justify-center items-center h-full'>
                <form onSubmit={login} className='space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='font-bold text-3xl'>Login</div>
                        <div onClick={() => router.push('/regester')} className='text-primary text-sm underline cursor-pointer'>Don't have an account?</div>
                    </div>
                    <div>
                        <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div>
                        <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                    <Button onClick={() => { }} loading={loading}>Login</Button>
                </form>
            </div>
        );
}
export default index;