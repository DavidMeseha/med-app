import type { FC } from 'react';
import { navList } from '@/constants/navigation';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import Link from 'next/link';

interface NavProps { }

const Nav: FC<NavProps> = ({ }) => {
    const router = useRouter()
    const { user, loading, logout } = useUser()

    return (
        <div className='flex justify-between items-center bg-white py-4 px-4 md:px-16 shadow-sm text-primary'>
            <Link href='/' className='font-extrabold text-2xl'>LOGO</Link>
            <div>
                <ul className='flex gap-4'>
                    {navList.map((navItem, index) => {
                        return (
                            <li key={index} className='py-2 px-4 cursor-pointer'><Link href={navItem.to}>{navItem.name}</Link></li>
                        )
                    })}
                </ul>
            </div>
            <div className='flex justify-end gap-2 min-w-[150px]'>
                {loading && <div className='text-strong-highlight'>...loading</div>}
                {!user && !loading && <div className='cursor-pointer hover:underline' onClick={() => router.push('/login')}>login</div>}
                {user && <div onClick={logout} className='cursor-pointer hover:underline'>logout</div>}
                {user && <div className='hover:underline'> Hello <Link href={`/profile/${user.id}`}>{user.name.split(' ')[0]}</Link> ! </div>}
            </div>
        </div>
    );
}
export default Nav;