import Button from "@/components/Button";
import Input from "@/components/Input";
import useMessage from "@/hooks/useMessage";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const index = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"doctor" | "user">("doctor");
  const router = useRouter();
  const { setErrorMessage, setDoneMessage } = useMessage();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const regester = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword)
      return setErrorMessage("Passsword and confirm password are not matching");

    let body = { name, email, password, role };
    let response: Response;
    setLoading(true);

    try {
      response = await fetch(`/api/regester`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setLoading(false);
      if (response.status === 500)
        return setErrorMessage(t("internalServerError"));
      if (response.status === 402)
        return setErrorMessage(t("emailAlreadyRegistered"));
      if (response.status === 200) {
        setDoneMessage(t("registeredSuccessfully"));
        router.push("/login");
      }
    } catch (error) {
      //console.log(error)
    }
  };

  return (
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
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            name="name"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder={t("email")}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            name="email"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder={t("password")}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            name="password"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder={t("confirmPassword")}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            name="confirm"
          />
        </div>
        <div>
          <div className="flex outline outline-2 outline-highlight -outline-offset-1 text-center rounded-md overflow-hidden">
            <div
              data-cy="doctor-switch"
              className={`p-2 grow cursor-pointer ${
                role === "doctor"
                  ? "bg-primary text-white"
                  : "hover:bg-highlight"
              }`}
              onClick={() => !loading && setRole("doctor")}
            >
              {t("doctor")}
            </div>
            <div
              data-cy="user-switch"
              className={`p-2 grow cursor-pointer ${
                role === "user" ? "bg-primary text-white" : "hover:bg-highlight"
              }`}
              onClick={() => !loading && setRole("user")}
            >
              {t("user")}
            </div>
          </div>
        </div>
        <Button onClick={() => {}} loading={loading}>
          {t("register")}
        </Button>
      </form>
    </div>
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
