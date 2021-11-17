import { useState } from 'react';
import './ProfileSearch.css';
import { SEARCH_PROFILES_ENDPOINT } from './Routes';
import { Link } from 'react-router-dom';

function ProfileSearch() {
    const [query, setQuery] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);

    const writeSearchQuery = function(e){
        const searchQuery = e.target.value;
        setQuery(searchQuery);
    }

    const searchProfiles = function(e) {
        e.preventDefault();
        fetch(SEARCH_PROFILES_ENDPOINT + query).then(function(response) {
            return response.json();
        }).then(function(data) {
            setFoundUsers(data)
            console.log(data);
        });
    }

    return (
        <div className="ProfileSearch">
            <form onSubmit={searchProfiles}>
                <input
                    type="text"
                    required
                    value={query}
                    onChange={writeSearchQuery}
                />
                <button>Buscar perfiles</button>
            </form>
            <div className="profile-list">
                {foundUsers.length != 0 && (<h2>Perfiles</h2>)}
                {foundUsers.map(function(profile) {
                    return (
                        <Link to={"/profile/" + profile.username} key={profile.user_id}>
                            <p><b>{profile.profile_name}</b> @{profile.username}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default ProfileSearch;