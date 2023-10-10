import Message from '@/components/Message';
import type { FC, ReactNode } from 'react';
import { createContext, useState } from 'react';

export const MessageContext = createContext<{
    setErrorMessage: (s: string) => void
    setDoneMessage: (s: string) => void
}>({ setErrorMessage: () => { }, setDoneMessage: () => { } })

export const MessageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState('')
    const [state, setState] = useState(false)
    const [type, setType] = useState<'error' | 'done'>('error')

    const setErrorMessage = (text: string) => {
        setMessage(text)
        setType('error')
        setState(true)
    }

    const setDoneMessage = (text: string) => {
        setMessage(text)
        setType('done')
        setState(true)
    }

    return (
        <MessageContext.Provider value={{ setErrorMessage, setDoneMessage }}>
            <Message message={message} state={state} setState={setState} type={type} />
            {children}
        </MessageContext.Provider>
    );
}