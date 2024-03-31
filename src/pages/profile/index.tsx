import PageTitle from "@/components/PageTitle";
import Doctor from "@/components/profile/Doctor";
import UserProfile from "@/components/profile/User";
import useUser from "@/hooks/useUser";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Profile = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={t("profile")} />
      {user?.role === "doctor" ? <Doctor /> : <UserProfile />}
    </>
  );
};
export default Profile;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, "common")),
    },
  };
}
