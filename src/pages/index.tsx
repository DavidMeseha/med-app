import HeaderButton from "@/components/HeaderButton";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation();

  console.log(t);
  return (
    <div className="relative back-image h-full">
      <div className="absolute flex justify-center items-center bg-over-cover w-full h-full pt-16">
        <div className="text-center">
          <div className="font-bold text-4xl text-white mb-6">
            {t("welcomeToThePlatform")}
          </div>
          <HeaderButton>{t("getStarted")}</HeaderButton>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, "common")),
    },
  };
}
