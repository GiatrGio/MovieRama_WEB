import UserAuthentication from "../userAuthentication/userAuthentication";
import React from "react";
import "./header.css";

interface HeaderProps {
    onLogin: (userId: number) => void;
}
const Header:React.FC<HeaderProps> = (props) => {
    const { onLogin } = props;

    const handleLogin = (userId: number) => {
        onLogin(userId);
    };

    return (
        <section className="Header">
            <h1>MovieRama</h1>
            <UserAuthentication onLogin={handleLogin}/>
        </section>
    )
}

export default Header;