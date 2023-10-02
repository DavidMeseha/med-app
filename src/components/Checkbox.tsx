import { useRef, type FC, useEffect } from 'react';

interface CheckboxProps {
    title: string
    boxFor:string
    onChange: (event: any) => void
    state: boolean
}

const Checkbox: FC<CheckboxProps> = ({ title, onChange, state, boxFor }) => {
    const boxRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (boxRef.current) boxRef.current.checked = state
    }, [state])

    return (
        <label className='checkbox'>{title}
            <input ref={boxRef} onChange={onChange} name={boxFor} type='checkbox' />
            <span className='checkmark'></span>
        </label>
    );
}
export default Checkbox;