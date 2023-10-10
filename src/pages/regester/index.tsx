import Button from '@/components/Button';
import Input from '@/components/Input';
import useMessage from '@/hooks/useMessage';
import { useRouter } from 'next/router';
import { useState } from 'react'

const index = ({ }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'doctor' | 'user'>('doctor')
  const router = useRouter()
  const { setErrorMessage, setDoneMessage } = useMessage()
  const [loading, setLoading] = useState(false)

  const regester = async (e: any) => {
    e.preventDefault()

    if (password !== confirmPassword) return setErrorMessage('Passsword and confirm password are not matching')

    let body = { name, email, password, role }
    let response: Response
    setLoading(true)

    try {
      response = await fetch(`/api/regester`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      setLoading(false)
      if (response.status === 500) return setErrorMessage('Internal server error')
      if (response.status === 402) return setErrorMessage('Email Already Regestered')
      if (response.status === 200) {
        setDoneMessage('You Regestered successfuly')
        router.push('/login')
      }
    } catch (error) {
      //console.log(error)
    }
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <form data-cy="regester-form" onSubmit={regester} className='space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md'>
        <div className='flex justify-between items-center w-full'>
          <div className='font-bold text-3xl'>Regester</div>
          <div onClick={() => router.push('/login')} className='text-primary text-sm underline cursor-pointer'>Already have an account?</div>
        </div>
        <div>
          <Input type='text' placeholder='Your Name' onChange={(e) => setName(e.target.value)} value={name} required name='name' />
        </div>
        <div>
          <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required name="email" />
        </div>
        <div>
          <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required name='password' />
        </div>
        <div>
          <Input type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required name='confirm' />
        </div>
        <div>
          <div className='flex outline outline-2 outline-highlight -outline-offset-1 text-center rounded-md overflow-hidden'>
            <div
              data-cy="doctor-switch"
              className={`p-2 grow cursor-pointer ${role === 'doctor' ? 'bg-primary text-white' : 'hover:bg-highlight'}`}
              onClick={() => !loading && setRole('doctor')}
            > I Am A doctor
            </div>
            <div
              data-cy="user-switch"
              className={`p-2 grow cursor-pointer ${role === 'user' ? 'bg-primary text-white' : 'hover:bg-highlight'}`}
              onClick={() => !loading && setRole('user')}
            >I Need A Doctor
            </div>
          </div>
        </div>
        <Button onClick={() => { }} loading={loading}>Regester</Button>
      </form >
    </div >
  );
}
export default index;