import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { configHeader, server } from "../../config";
import Axios from "axios";
import jscookie from "js-cookie";

interface logoutProps {
  token: string;
}

const Logout: React.FunctionComponent<logoutProps> = ({ token }) => {
  console.log(token);

  const router = useRouter();
  useEffect(() => {
      Axios.get(`/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          Axios.get(`${server}/logout`).then((res) => {
            const { success } = res.data;
            if (success) {
              jscookie.remove("role");
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

export const getServerSideProps = async (ctx: any) => {
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
