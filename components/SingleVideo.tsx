import Link from "next/link";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { useRouter } from 'next/router';

export interface VideoProps {
  video: Video;
}

type Video = {
  video_id: string;
  url: string;
  category: string;
  description: string;
  title: string;
};

const Video: React.FunctionComponent<VideoProps> = ({ video }) => {
    const router = useRouter();
    const clickable: MouseEventHandler<HTMLDivElement> | undefined = () => {
        router.push(`/videos/${video.category}/${video.video_id}`);
    }
  return (
    <div key={video.video_id} className="col-lg-3 col-md-3 col-sm-6 flex-0  p-10">
      <div className="card hover-opacity" onClick={clickable}>
        <div className="thumbnail mx-auto hidden w-full">
          <Image
            src={`/assets/youtube.jpg`}
            className="w-full"
            alt={video.title}
            width={100}
            height={150}
          />
        </div>
        <div className="card-body">
          <h4 className="card-title bg-primary">
            <Link href={`/videos/${video.category}/${video.video_id}`}>
              <a>{video.title.substring(0, 40)}...</a>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Video;
