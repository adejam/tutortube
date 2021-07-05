import cookies from 'next-cookies';

export interface singleVideoProps {
    video: Video
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

 
const singleVideo: React.FunctionComponent<singleVideoProps> = ({video, token, error}) => {
    console.log(video);
    console.log(token);
    console.log(error);
    return ( 
        <div>
            <h1>{video.title}</h1>
            <p>{video.description}</p>
        </div>
     );
}
 
export default singleVideo;

export const getServerSideProps = async (ctx: any) => {
    let video = {};
    let error = '';
    const { token, role, username } = cookies(ctx);
    if (!token) {
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
        const vide = await response.json();
        video = vide.videos
      } catch (e) {
        error = e.toString();
      }
      if (error) {
        return {
          redirect: {
            destination: '/404',
            permanent: false,
          },
        }
      }
    return {
      props: { video, token, role, error },
    };
  };
