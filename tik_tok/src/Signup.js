import { useState } from 'react';
import './Signup.css';
import { CREATE_USER_ENDPOINT } from './Routes';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profileName, setProfileName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const writeUsername = function(e) {
        const usernameValue = e.target.value;
        setUsername(usernameValue);  
    };

    const writePassword = function(e) {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    }

    const writeProfileName = function(e) {
        const profileNameValue = e.target.value;
        setProfileName(profileNameValue);
    }

    const writeDescription = function(e) {
        const descriptionValue = e.target.value;
        setDescription(descriptionValue);
    }

    const handleSubmit = function(e) {
        e.preventDefault();
        const newUser = {
            username,
            password,
            profile_name: profileName,
            description
        }
        const init = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }
        fetch(CREATE_USER_ENDPOINT, init).then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log(data);
            sessionStorage.setItem("loggedUser", newUser.username);
            navigate("/feed")
        }).catch(function() {
            console.log("Todo mal");
        });
    }

    return (
        <div className="Login">
            <h1>Cuenta nueva</h1>
            <form onSubmit={handleSubmit}>
                <label>Usuario</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={writeUsername}
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={writePassword}
                />

                <label>Nombre</label>
                <input
                    type="text"
                    required
                    value={profileName}
                    onChange={writeProfileName}
                />
                
                <label>Descripción</label>
                <input
                    type="text"
                    required
                    value={description}
                    onChange={writeDescription}
                    placeholder="I like..."
                />

                <button type="submit">Crear cuenta</button>
            </form>
        </div>
    );
}

export default Signup;
