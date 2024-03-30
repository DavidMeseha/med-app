import useUser from "@/hooks/useUser";
import { type FC, useState, useEffect } from "react";
import UserComment from "../UserComment";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface doctorProps {}

const Doctor: FC<doctorProps> = ({}) => {
  const { user } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then(async (response) => {
        if (response.status === 200) {
          let data = await response.json();
          setUsers(data);
        } else {
          router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  }, [user]);

  if (user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md">
          <div className="text-center font-bold text-lg text-primary">
            {user.name}
          </div>
          <div>
            {loadingUsers && <div className="text-center">{t("loading")}</div>}
            {!loadingUsers && (
              <ul className="space-y-4">
                {users.map((paitanat) => {
                  return (
                    <li className="p-2 rounded-md bg-highlight">
                      <div className="space-y-2">
                        <div className="text-base">{paitanat.name}</div>
                        <UserComment id={paitanat._id} />
                      </div>
                    </li>
                  );
                })}

                <li className="p-2 rounded-md">
                  <p className="text-gray-400 text-xs">{t("doctorProfile")}</p>
                  <p className="text-gray-400 text-xs">
                    {t("canAddNotesToNonDoctor")}
                  </p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default Doctor;
