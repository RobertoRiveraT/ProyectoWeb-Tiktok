import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Profile.css';
import { GET_PROFILE_ENDPOINT } from './Routes';
import {Link} from 'react-router-dom';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([])
    const {username} = useParams();

    useEffect(function() {
        fetch(GET_PROFILE_ENDPOINT + username).then(function(response) {
            return response.json();
        }).then(function(data) {
            setProfile(data);
            console.log(data);
            setVideos(data.videos)
        });
    }, []);

    return (
        <div className="Profile">
            <h1>{profile && profile.username}</h1>
            <h2>{profile && profile.profile_name}</h2>
            <p><b>{profile && profile.likes}</b> Me gusta</p>
            <p>{profile && profile.description}</p>
            <div className="posted-videos">
                {videos.map(function(video) {
                    return (
                        <Link to={"../video/" + video.video_id} key={video.video_id}>{video.title}</Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Profile;
