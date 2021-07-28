import YouTube from 'react-youtube';

export interface YoutubePlayerProps {
    videoId: string;
}
 
const YoutubePlayer: React.FunctionComponent<YoutubePlayerProps> = ({videoId}) => {
    return ( 
        <YouTube videoId={videoId} containerClassName={'youtubeContainer'}/>     
    );
}
 
export default YoutubePlayer;