import React, {useState} from 'react';
import './App.css';
import Header from "./components/header/header";
import MovieSection from "./components/movieSection/movieSection";

function App() {
    const [userId, setUserId] = useState<number>(0);

    const handleLogin = (newUserId: number) => {
        setUserId(newUserId);
    };

  return (
    <div className="App">
      <Header onLogin={handleLogin}/>
      <MovieSection loggedUserId={userId} />
    </div>
  );
}

export default App;
