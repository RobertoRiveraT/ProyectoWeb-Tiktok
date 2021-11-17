import './Video.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GET_VIDEO_ENDPOINT } from './Routes';
import Reactions from './Reactions';

function Video() {
    const [video, setVideo] = useState(null)
    const [showingComments, setShowingComments] = useState(false);
    const { video_id } = useParams();

    const toggleReactionSections = function() {
        setShowingComments(!showingComments);
    }

    useEffect(function() {
        fetch(GET_VIDEO_ENDPOINT + video_id).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            setVideo(data);
        }).catch(function(err) {
            console.log('Error buscando el video');
        });
    }, []);


    return (
        <div className="Video">
            {video && !showingComments && (
                <div className="video-wrapper">
                    <video src={video.url} controls autoPlay loop muted></video>
                    <button id="reactions-video" onClick={toggleReactionSections}>Reaccionar</button>
                </div>
                
            )}
            {video && showingComments && (<Reactions video={video}/>)}
        </div>
    );
}

export default Video;
