import type { FC, ReactNode } from 'react';

interface buttonProps {
    children: ReactNode
    onClick: (e: any) => void
    loading: boolean
}

const Button: FC<buttonProps> = ({ children, onClick, loading }) => {
    return (
        <div className='relative'>
            {loading && <div className='absolute bg-white w-full h-full opacity-75 flex items-center justify-center'>...loading</div>}
            <button
                className='px-4 py-2 bg-primary w-full text-white rounded-md h-10'
                onClick={onClick}
            > {!loading && children}
            </button>
        </div>
    );
}
export default Button;