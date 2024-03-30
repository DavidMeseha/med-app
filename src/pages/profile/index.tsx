import Doctor from '@/components/profile/Doctor';
import UserProfile from '@/components/profile/User';
import useUser from '@/hooks/useUser';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Profile = () => {
    const { user } = useUser()

    if (user?.role === 'doctor') return <Doctor />
    return <UserProfile />
}
export default Profile;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
      props: {
        ...(await serverSideTranslations(locale as string, "common")),
      },
    };
  }