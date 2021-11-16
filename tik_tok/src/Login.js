import { useState } from 'react';
import './Login.css';
import { AUTHENTICATE_USER_ENDPOINT } from './Routes';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const writeUsername = function(e) {
        const usernameValue = e.target.value;
        setUsername(usernameValue);  
    };

    const writePassword = function(e) {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    }

    const handleSubmit = function(e) {
        e.preventDefault();
        const loginData = {
            username,
            password
        }
        const init = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginData)
        }
        fetch(AUTHENTICATE_USER_ENDPOINT, init).then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log(data);
            if(data.count > 0){
                sessionStorage.setItem("loggedUser", loginData.username);
                navigate("/feed")
            } else {
                setUsername('');
                setPassword('');
            }
        }).catch(function() {
            console.log("Todo mal");
        });
    }

    return (
        <div className="Login">
            <h1>Iniciar sesión</h1>
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

                <button type="submit">Iniciar sesión</button>
                <Link to="signup">Crear cuenta nueva</Link>
            </form>
        </div>
    );
}

export default Login;
