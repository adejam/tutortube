import cookies from 'next-cookies';

export interface videosCategoryProps {
    videos: object
    username: string
    role: string
    token: string
    error: string
}

type Video = {
    video_id: string;
    url: string
    category: string
    description: string
    title: string
}

 
const videosCategory: React.FunctionComponent<videosCategoryProps> = ({videos, token, error}) => {
    console.log(videos);
    console.log(token);
    console.log(error);
    return ( 
        <h1>Videos</h1>
    );
}
 
export default videosCategory;

export const getServerSideProps = async (ctx: any) => {
    let videos = {};
    let error = '';
    const { token, role, username } = cookies(ctx);
    if (!token && !role && !username) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
      try {
        const response = await fetch(
          `https://tutortube-api.herokuapp.com/api/videos/${ctx.params.category}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          },
        );
        videos = await response.json();
      } catch (e) {
        error = e.toString();
      }
    return {
      props: { videos, token, role, error },
    };
  };
