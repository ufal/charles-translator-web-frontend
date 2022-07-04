import Form from "../src/components/form";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => <Form />;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "aboutUs"])),
      // Will be passed to the page component as props
    },
  };
}

export default Index;
