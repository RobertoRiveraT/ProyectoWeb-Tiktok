import { useEffect, useState } from 'react';
import './VideoFeed.css';
import { GET_VIDEOS_ENDPOINT } from './Routes';
import { Link } from 'react-router-dom';

function VideoFeed() {
    const [videos, setVideos] = useState([]);

    useEffect(function() {
        fetch(GET_VIDEOS_ENDPOINT).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            setVideos(data);
        });
    }, []);

    return (
        <div className="VideoFeed">
            <Link id="search-profile-btn" to="../profile/search">Buscar perfiles</Link>
            {videos.map(function(video) {
                return (
                    <div className="video-info" key={video.video_id}>
                        <h2><Link to={"../video/" + video.video_id}>{video.title}</Link></h2>
                        <h3>{video.profile_name}</h3>
                        <p>@{video.username}</p>
                        <p className="likes-count">Likes: <b>{video.likes}</b></p>
                    </div>
                )
            })}
        </div>
    );
}

export default VideoFeed;
