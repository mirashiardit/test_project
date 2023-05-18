import { GetServerSidePropsContext } from "next";

export default function IndexPage() {
  return <div>Index page</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const shouldRedirect = true;

  if (shouldRedirect) {
    return {
      redirect: {
        destination: "/applications",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
