import Doctor from '@/components/profile/Doctor';
import UserProfile, { Note } from '@/components/profile/User';
import useUser from '@/hooks/useUser';
import { NextPageContext } from 'next';
import { type FC } from 'react';

interface ProfileProps { }

const Profile: FC<ProfileProps> = ({ }) => {
    const { user } = useUser()

    if (user?.role === 'doctor') return <Doctor />
    return <UserProfile />
}
export default Profile;

export const getServerSideProps = (async (context: NextPageContext) => {
    let { id } = context.query
    let cookie = context.req
    console.log(id)
    return { props: {} }
})