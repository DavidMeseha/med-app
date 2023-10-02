import type { FC, ReactNode } from 'react';
import Nav from './Nav';
import { MessageProvider } from '@/context/MessageContext';
import { UserProvider } from '@/context/UserContext';

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      <MessageProvider>
        <nav className='fixed top-0 w-full z-20'>
          <Nav />
        </nav>
        <main className='h-[100vh]'>
          {children}
        </main>
      </MessageProvider>
    </UserProvider>
  );
}
export default Layout;