import useUser from "@/hooks/useUser";
import UserComment from "../UserComment";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Doctor = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  const { data, isFetching } = useQuery<
    {
      _id: string;
      name: string;
      email: string;
    }[]
  >({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((response) => response.data),
  });

  if (user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md">
          <div className="text-center font-bold text-lg text-primary">
            Dr.{user.name}
          </div>
          <div>
            {isFetching && <div className="text-center">{t("loading")}</div>}
            {!isFetching && !!data && (
              <ul className="space-y-4">
                {data.map((paitanat, i) => {
                  return (
                    <li key={i} className="p-2 rounded-md bg-highlight">
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
