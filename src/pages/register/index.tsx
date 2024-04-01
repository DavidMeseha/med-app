import Button from "@/components/Button";
import Input from "@/components/Input";
import useMessage from "@/hooks/useMessage";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import PageTitle from "@/components/PageTitle";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface NewUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: "doctor" | "user";
}

const index = ({}) => {
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "doctor",
  });
  const router = useRouter();
  const { setErrorMessage, setDoneMessage } = useMessage();
  const { t } = useTranslation();

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (newUser: NewUser) => axios.post("/api/register", newUser),
    onSuccess: () => {
      setDoneMessage(t("registeredSuccessfully"));
      router.push("/login");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 500)
        return setErrorMessage(t("internalServerError"));
      if (error.response?.status === 402)
        return setErrorMessage(t("emailAlreadyRegistered"));
    },
  });

  const regester = async (e: any) => {
    e.preventDefault();

    if (newUser.password !== newUser.confirmPassword)
      return setErrorMessage(t("PasswordConfirmNotMatching"));

    let body: NewUser = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    };

    registerMutation.mutate(body);
  };

  return (
    <>
      <PageTitle title={t("register")} />
      <div className="flex justify-center items-center h-full">
        <form
          data-cy="regester-form"
          onSubmit={regester}
          className="space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md"
        >
          <div className="flex justify-between items-center w-full">
            <div className="font-bold text-3xl">{t("register")}</div>
            <div
              onClick={() => router.push("/login")}
              className="text-primary text-sm underline cursor-pointer"
            >
              {t("alreadyHaveAccount")}
            </div>
          </div>
          <div>
            <Input
              type="text"
              placeholder={t("name")}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              value={newUser.name}
              required
              name="name"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder={t("email")}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              value={newUser.email}
              required
              name="email"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder={t("password")}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              value={newUser.password}
              required
              name="password"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder={t("confirmPassword")}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
              value={newUser.confirmPassword || ""}
              required
              name="confirm"
            />
          </div>
          <div>
            <div className="flex outline outline-2 outline-highlight -outline-offset-1 text-center rounded-md overflow-hidden">
              <div
                data-cy="doctor-switch"
                className={`p-2 grow cursor-pointer ${
                  newUser.role === "doctor"
                    ? "bg-primary text-white"
                    : "hover:bg-highlight"
                }`}
                onClick={() =>
                  !registerMutation.isPending &&
                  setNewUser({ ...newUser, role: "doctor" })
                }
              >
                {t("doctor")}
              </div>
              <div
                data-cy="user-switch"
                className={`p-2 grow cursor-pointer ${
                  newUser.role === "user"
                    ? "bg-primary text-white"
                    : "hover:bg-highlight"
                }`}
                onClick={() =>
                  !registerMutation.isPending &&
                  setNewUser({ ...newUser, role: "user" })
                }
              >
                {t("user")}
              </div>
            </div>
          </div>
          <Button onClick={() => {}} loading={registerMutation.isPending}>
            {t("register")}
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
