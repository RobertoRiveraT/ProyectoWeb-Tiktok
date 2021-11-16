import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reactions.css';
import { COMMENT_VIDEO_ENDPOINT, IS_LIKED_ENDPOINT, LIKE_VIDEO_ENDPOINT } from './Routes';

function Reactions(props) {
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState('');
    const video = props.video;
    const navigate = useNavigate()

    const likeData = {
        username: sessionStorage.getItem('loggedUser'),
        video_id: video.video_id
    }

    const POSTHeaders = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(likeData)
    }

    const writeComment = function(e) {
        const userComment = e.target.value;
        setNewComment(userComment);
    }

    useEffect(function() {        
        fetch(IS_LIKED_ENDPOINT, POSTHeaders).then(function(response) {
            return response.json();
        }).then(function(data) {
            setIsLiked(data.count === 1);
        });
    }, []);

    const likeVideo = function(e) {
        e.preventDefault();
        fetch(LIKE_VIDEO_ENDPOINT, POSTHeaders).then(function(response) {
            return response.json();
        }).then(function(data) {
            setIsLiked(true);
        });
    }

    const postComment = function(e) {
        e.preventDefault();
        const commentData = {
            username: sessionStorage.getItem('loggedUser'),
            video_id: video.video_id,
            content: newComment
        }
        const headers = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentData)
        };
        fetch(COMMENT_VIDEO_ENDPOINT, headers).then(function(response) {
            if(response.status === 200)
                navigate(0);
        });
    }
    
    return (
        <div className="Reactions">
            <form onSubmit={likeVideo}>
                <button disabled={isLiked}>Me gusta</button>
            </form>
            {video.comments.map(function(comment) {
                return (
                    <div className="comment" key={comment.comment_id}>
                        <h6>{comment.profile_name}</h6>
                        <p>{comment.content}</p>
                    </div>
                );
            })}
            <form onSubmit={postComment}>
            <input
                    type="text"
                    required
                    value={newComment}
                    onChange={writeComment}
                />
                <button>Comentar</button>
            </form>
        </div>
    );
}

export default Reactions;
