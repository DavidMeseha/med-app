import type { FC, ReactNode } from 'react';

interface HeaderButtonProps {
    children: ReactNode
}

const HeaderButton: FC<HeaderButtonProps> = ({ children }) => {
    return (
        <button className="rounded-full bg-transparent px-6 py-2 m-auto transition
            text-white border-2 border-white w-fit hover:bg-white hover:text-black"
        >{children}
        </button>
    )
}
export default HeaderButton;