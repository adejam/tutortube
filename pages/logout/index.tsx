import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { server } from "../../config";
import Axios from "axios";
import jscookie from "js-cookie";
import { GetServerSideProps, GetServerSidePropsContext, } from "next";

interface logoutProps {
  token: string;
}

const Logout: React.FunctionComponent<logoutProps> = ({ token }):JSX.Element => {

  const router = useRouter();
  useEffect(() => {
      Axios.get(`/logout`, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // a request is sent to the api-endpoint which deletes the token from the backend API endpoint
        .then(() => {
          Axios.get(`${server}/logout`).then((res) => { // when the request is successful we send a request to the api/logout to delete the token cookie
            const { success } = res.data;
            if (success) { // we checked here if success is true then we run the below code
              jscookie.remove("role"); // we removed the role and username cookies
              jscookie.remove("username");
              router.push("/");
            }
          });
        })
        .catch((error) => {
          if (error.toString() === "Error: Request failed with status code 401"){
            Axios.get(`${server}/logout`).then((res) => {
              const { success } = res.data;
              if (success) {
                jscookie.remove("role");
                jscookie.remove("username");
                router.push("/");
              }
            });
          }
          router.push("/");
        });
  }, [router, token]);

  

  return <><div>Logging Out....</div></>;
};

export default Logout;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { token } = cookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { token },
  };
};
