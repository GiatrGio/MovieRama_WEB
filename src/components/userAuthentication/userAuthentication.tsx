import {useState} from "react";
import axios from "axios";
import "./userAuthentication.css";
import {BASE_API_URL} from "../../config";

interface UserAuthenticationProps {
    onLogin: (userId: number) => void;
}
const UserAuthentication:React.FC<UserAuthenticationProps> = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email] = useState('');
    const [error, setError] = useState('');
    const { onLogin } = props;

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_API_URL}/api/users/login`, {
                username,
                password,
            });

            if (response.status === 200) {
                setLoggedIn(true);
                onLogin(response.data);
            } else {
                setError('Login failed. Please check your username and password.');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setError('Authentication failed. Please check your credentials.');
            } else {
                setError('An error occurred during login.');
            }
        }
    };

    const handleRegistration = async () => {
        try {
            const response = await axios.post(`${BASE_API_URL}/api/users/register`, {
                username,
                password,
                email,
            });

            if (response.status === 201) {
                setLoggedIn(true)
                onLogin(response.data);
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred during registration.');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        onLogin(0);
    };

    return (
        <div>
            {loggedIn ? (
                <div>
                    <p>Hello {username}</p>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <div>
                    <p>You are not logged in.</p>
                    <div className="UserAuthenticationSection">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Log In</button>
                        <button onClick={handleRegistration}>Register</button>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            )}
        </div>
    )
}

export default UserAuthentication;