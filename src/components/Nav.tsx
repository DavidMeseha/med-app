import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Nav = () => {
  const router = useRouter();
  const { user, isFetching, logout } = useUser();
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center bg-white py-4 px-4 md:px-16 shadow-sm text-primary">
      <Link href="/" className="font-extrabold text-2xl">
        {t("logo")}
      </Link>
      <div className="flex justify-end gap-2 min-w-[150px]">
        {isFetching && (
          <div className="text-strong-highlight">{t("loading")}</div>
        )}
        {!user && !isFetching && (
          <div
            className="cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            {t("login")}
          </div>
        )}
        {user && !isFetching && (
          <>
            <div className="cursor-pointer hover:underline">
              {t("hello")}
              <Link className="ms-1" href={"/profile"}>
                {user.name.split(" ")[0]}
              </Link>{" "}
              !
            </div>
            <div>|</div>
            <div
              onClick={() => {
                if (router.pathname === "/profile") router.push("/");
                logout();
              }}
              className="cursor-pointer hover:underline"
            >
              {t("logout")}
            </div>
          </>
        )}
        <div>|</div>
        <Link
          href={router.pathname}
          locale={router.locale === "en" ? "ar" : "en"}
        >
          {t("langChange")}
        </Link>
      </div>
    </div>
  );
};
export default Nav;
