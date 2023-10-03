import useUser from '@/hooks/useUser';
import { type FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface userProps { }

export interface Note {
    doctor: { name: string, id: string }
    date: Date
    body: string
}


const UserProfile: FC<userProps> = ({ }) => {
    const { user, loading } = useUser()
    const router = useRouter()
    const [notes, setNotes] = useState<Note[]>([])
    const [loadingNotes, setLoading] = useState(false)

    useEffect(() => {
        if (loading || !user) return
        setLoading(true)
        fetch('/api/notes/' + user?.id).then(async response => {
            if (response.status === 200) {
                let data = await response.json()
                setNotes(data)
            } else {
                router.push('/login')
            }
        }).catch(error => {
            console.log(error)
        })

        setLoading(false)
    }, [user])

    if (loading) return

    if (user) {
        return (
            <div className='flex justify-center items-center h-full'>
                <div className='space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md'>
                    <div className='text-center font-bold text-lg text-primary'>{user.name}</div>
                    <div className=''>Doctors Notes</div>
                    <div>
                        <ul className='space-y-4'>
                            {notes.map((note) => {
                                if (!note) return
                                let date = new Date(note.date)//.toLocaleDateString('en',{day:'numeric', month:'numeric'})
                                let today = new Date()

                                let def: number = (today as any) - (date as any)
                                def = Math.floor(def / 1000)
                                let display = def + ' secs ago'

                                if (def >= 60) {
                                    def = Math.floor(def / 60)
                                    display = def + ' mins ago'
                                }
                                if (def >= 60) {
                                    def = Math.floor(def / 60)
                                    display = def + ' hrs ago'
                                }
                                if (def >= 24) {
                                    def = Math.floor(def / 24)
                                    display = def + ' days ago'
                                }
                                if (def >= 31) {
                                    def = Math.floor(def / 30)
                                    display = def + ' months ago'
                                }

                                return (
                                    <li className='p-2 rounded-md bg-highlight'>
                                        <div className='space-y-2'>
                                            <div className='flex justify-between items-center'>
                                                <div className='text-base text-primary'>{note.doctor.name}</div>
                                                <div className='text-xs'>{display}</div>
                                            </div>
                                            <p className='text-sm'>{note.body}</p>
                                        </div>
                                    </li>
                                )
                            })}
                            <li className='p-2 rounded-md'>
                                <p className='text-gray-400 text-xs'>This is a non-doctor's Profile Page and listed all notes for this user.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserProfile;