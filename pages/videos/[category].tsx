import cookies from 'next-cookies';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import SingleVideo from '../../components/SingleVideo'

interface Data {
  videos: Array<Video>
  error: string
}

export interface videosCategoryProps {
    data: Data
    category: string
    error: string
}

type Video = {
    video_id: string;
    url: string
    category: string
    description: string
    title: string
}

 
const VideosCategory: React.FunctionComponent<videosCategoryProps> = ({data, category, error}):JSX.Element => {
    const router = useRouter();
    useEffect(() => {
      if (data.error) {
      router.push("/404");
    }
    }, [data.error, router])
    
    const videosArray = data.videos ? data.videos : [];
    return ( 
        <div className="d-flex justify-center wrap">
         <h2 className="ta-center capitalize">{category} Videos</h2>
        {videosArray.length ? videosArray.map(video => (
          <SingleVideo key={video.video_id} video={video} />
        
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
      </div>
    );
}
 
export default VideosCategory;

export const getServerSideProps:GetServerSideProps = async (ctx: any) => {
    let data = {};
    let error = '';
    const category = ctx.params.category;
    const { token } = cookies(ctx);
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
      props: { data, category, error, },
    };
  };
