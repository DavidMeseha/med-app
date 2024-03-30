import useUser from "@/hooks/useUser";
import Link from "next/link";
import NotesList from "../NotesList";
import { useTranslation } from "next-i18next";

export interface Note {
  doctor: { name: string; id: string };
  date: Date;
  body: string;
}

const UserProfile = () => {
  const { user, isFetching } = useUser();
  const { t } = useTranslation();

  if (isFetching)
    return <div className="mt-28 text-center">{t("loading")}</div>;

  if (!user && !isFetching)
    return (
      <div className="mt-28 text-center">
        {t("youNeedTo")}
        <span className="text-blue-700 underline ms-2">
          <Link href="/login">{t("login")}</Link>
        </span>
      </div>
    );

  if (user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md">
          <div className="text-center font-bold text-lg text-primary">
            {user.name}
          </div>
          <div>{t("doctorNotes")}</div>
          <NotesList />
        </div>
      </div>
    );
  }
};

export default UserProfile;
