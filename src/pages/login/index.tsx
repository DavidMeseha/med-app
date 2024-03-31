import Button from "@/components/Button";
import Input from "@/components/Input";
import useUser from "@/hooks/useUser";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import PageTitle from "@/components/PageTitle";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isFetching, login } = useUser();
  const { t } = useTranslation();
  const router = useRouter();

  function submitHandle(e: any) {
    e.preventDefault();
    login(email, password);
  }

  if (!user)
    return (
      <>
      <PageTitle title={t("login")}/>
        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={submitHandle}
            className="space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md"
          >
            <div className="flex justify-between items-center w-full">
              <div className="font-bold text-3xl">{t("login")}</div>
              <div
                onClick={() => router.push("/register")}
                className="text-primary text-sm underline cursor-pointer"
              >
                {t("dontHaveAccount")}
              </div>
            </div>
            <div>
              <Input
                type="email"
                placeholder={t("email")}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder={t("password")}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                required
              />
            </div>
            <Button onClick={() => {}} loading={isFetching}>
              {t("login")}
            </Button>
          </form>
        </div>
      </>
    );
};
export default index;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, "common")),
    },
  };
}
