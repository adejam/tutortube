import cookies from 'next-cookies';
import React from 'react';
import Link from 'next/link';

interface videos {
  videos: Array<Video>
}

export interface videosCategoryProps {
    videos: videos
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
    console.log(videos.videos);
    console.log(token);
    console.log(error);
    const videosArray = videos.videos;
    return ( 
        <>

        {videosArray.map(video => (
        <Link href={`/videos/${video.category}/{video.video_id}`} key={video.video_id}>
          <a>{video.title}</a>
          </Link>
      ))}
      <h1>jdiid</h1>
        </>
    );
}
 
export default videosCategory;

export const getServerSideProps = async (ctx: any) => {
    let videos = {};
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
        videos = await response.json();
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
      props: { videos, token, role, error },
    };
  };
