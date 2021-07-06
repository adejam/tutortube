import cookies from 'next-cookies';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Data {
  videos: Array<Video>
  error: string
}

export interface videosCategoryProps {
    data: Data
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

 
const VideosCategory: React.FunctionComponent<videosCategoryProps> = ({data, token, error}) => {
    console.log(data.error);
    console.log(data.videos);
    console.log(token);
    console.log(error);
    const router = useRouter();
    useEffect(() => {
      if (data.error) {
      router.push("/404");
    }
    }, [data.error, router])
    
    const videosArray = data.videos ? data.videos : [];
    return ( 
        <>
        {videosArray.length ? videosArray.map(video => (
          <div key={video.video_id}>
          <Link href={`/videos/${video.category}/${video.video_id}`} >
            <a>{video.title}</a>
          </Link>
          </div>
        
      )) : (
        <div className="ta-center">
          {error ? (
              <>
              <h1>Ooops...</h1>
              <h2>An Error Occurred. Check your internet connection and try again later :(</h2>
              </>
          ) : (
            <h2>There are currently no videos in this category</h2>
          )}
        </div>
      )
      
      }
        </>
    );
}
 
export default VideosCategory;

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
          `https://tutortube-api.herokuapp.com/api/videos/${ctx.params.category}`,
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
