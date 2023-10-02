import { FC, useEffect, useState } from "react";

interface MessageProps {
    message: string
    state: boolean
    setState: (s: boolean) => void
    type: 'error' | 'done'
}

const Message: FC<MessageProps> = ({ message, state, setState, type }) => {
    const [exit, setExit] = useState(false)

    const err = 'bg-[#ff000058] text-[#ff0000] border-[#ff000095]'
    const don = 'bg-[#4cd44058] text-[#4cd440] border-[#4cd44095]'
    let color = type === 'done' ? don : err

    useEffect(() => {
        if (!state) return

        setTimeout(() => {
            setExit(true)

            setTimeout(() => {
                setState(false)
                setExit(false)
            }, 1000)
        }, 4500)

    }, [state])

    return (
        <>
            {state && <div className='fixed left-0 top-20 w-full transition-all duration-1000 z-50' style={{ opacity: exit ? 0 : 1 }}>
                <div className={`px-10 py-3 w-fit m-auto border-2 rounded-full ${color}`}>
                    <p>{message}.</p>
                </div >
            </div>}
        </>
    )
};
export default Message;