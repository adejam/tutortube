import cookies from 'next-cookies';

export interface singleVideoProps {
    video: []
    token: string
    error: string
}
 
const singleVideo: React.FunctionComponent<singleVideoProps> = ({video, token, error}) => {
    console.log(video);
    console.log(token);
    console.log(error);
    return ( 
        <div>Single Video</div>
     );
}
 
export default singleVideo;

export const getServerSideProps = async (ctx: any) => {
    let video = {};
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
          `https://tutortube-api.herokuapp.com/api/videos/${ctx.params.category}/${ctx.params.video_id}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          },
        );
        video = await response.json();
      } catch (e) {
        error = e.toString();
      }
    return {
      props: { video, token, role, error },
    };
  };
