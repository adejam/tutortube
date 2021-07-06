import cookies from 'next-cookies';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Data {
  video: Video
  comments: Array<object>
  error: string
}

export interface singleVideoProps {
    data: Data
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

 
const SingleVideo: React.FunctionComponent<singleVideoProps> = ({data, token, error}) => {
    console.log(data);
    console.log(token);
    console.log(error);
    const router = useRouter();
    useEffect(() => {
      if (data.error) {
      router.push("/404");
    }
    }, [data.error, router])
    const {video} = data;
    return ( 
        <>
        <div className="ta-center">
          {error ? (
              <>
              <h1>Ooops...</h1>
              <h2>An Error Occurred. Check your internet connection and try again later :(</h2>
              </>
          ) : (
            <>
            <h1>{video.title}</h1>
            <p>{video.description}</p>
            </>
          )}
        </div>
        </>
     );
}
 
export default SingleVideo;

export const getServerSideProps = async (ctx: any) => {
    let data = {};
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
        data = await response.json();
      } catch (e) {
        error = e.toString();
      }
    return {
      props: { data, token, role, error },
    };
  };
