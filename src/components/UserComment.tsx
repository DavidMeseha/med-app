import { type FC, useState } from 'react';
import Input from './Input';
import Button from './Button';
import useUser from '@/hooks/useUser';
import useMessage from '@/hooks/useMessage';
import { useRouter } from 'next/router';

interface UserCommentProps {
    id: string
}

const UserComment: FC<UserCommentProps> = ({ id }) => {
    const { user } = useUser()
    const router = useRouter()
    const { setDoneMessage, setErrorMessage } = useMessage()
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    const addComment = () => {
        setLoading(true)
        
        let body = {
            to: id,
            doctor: user?.id,
            comment
        }

        fetch('/api/note', { method: 'POST', body: JSON.stringify(body) }).then((res) => {
            if (res.status === 200) {
                setDoneMessage('Comment Added successfuly')
            }
            else if (res.status === 401) {
                setErrorMessage('could not add comment Need to login')
                router.push('/login')
            }
            else {
                setErrorMessage('server Error Comment Not Added, try again later')
            }
        }).catch(e => {
            setErrorMessage('server Error Comment Not Added, try again later')
            console.log(e)
        })

        setLoading(false)
    }

    return (
        <div className='flex gap-2 w-full'>
            <div className='grow'>
                <Input onChange={(e) => setComment(e.target.value)} value={comment} type='text' placeholder='comment' name='comment' required />
            </div>
            <div className='w-20'>
                <Button onClick={addComment} loading={loading} >send</Button>
            </div>
        </div>
    );
}
export default UserComment;