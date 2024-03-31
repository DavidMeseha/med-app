import { NextPage } from "next";
import Head from "next/head";

interface Props {
  title: string;
}

const PageTitle: NextPage<Props> = ({ title }) => {
  return (
    <Head>
      <title>{`Platform | ${title}`}</title>
    </Head>
  );
};

export default PageTitle;
