import type { FC } from 'react';

interface inputProps {
    type: string,
    placeholder: string
    onChange: (e: any) => void
    value: string | number
    name: string
    required: boolean
}

const Input: FC<inputProps> = ({ type, placeholder, onChange, value, required, name }) => {
    return (
        <input
            data-cy={name + '-input'}
            className='p-2 bg-white outline outline-1 outline-highlight w-full rounded-md'
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}

export default Input;