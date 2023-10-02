import mongoose from 'mongoose';
import { useRouter } from 'next/router';
import { createContext, ReactNode, type FC, useState, useEffect } from 'react';

export interface User {
    id: string
    email: string
    name: string
    role: 'doctor' | 'user' | ''
}

const UserContext = createContext<{
    user: User | null
    loading: boolean
    setUser: (user: User | null) => void
    logout: () => void
}>({
    user: { id: '', email: '', name: '', role: '' },
    setUser(user) { },
    loading: false,
    logout: () => { }
})


export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)

        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(async (response) => {
            if (response.status === 200) {
                let data = await response.json()
                if (router.pathname === '/login') router.push('/')
                setUser(data)
            } else {
                setUser(null)
            }

            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const logout = () => {
        fetch('/api/logout').then(async (response) => {
            if (response.status === 200) {
                let data = await response.json()
                if (router.pathname.startsWith('/profile')) router.push('/')
                setUser(null)
            }
        }).catch((error) => {
            console.log(error)
        })
        setLoading(false)
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserContext;