import HeaderButton from "@/components/HeaderButton";
import PageTitle from "@/components/PageTitle";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={t("home")} />
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
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, "common")),
    },
  };
}
