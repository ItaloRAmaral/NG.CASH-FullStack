import React from 'react';
import './App.css';
import { useUserContext } from './context/user-context/hook';

function App() {
  const { teste } = useUserContext();
  return (
    <div className="App">
        <p>
          {`${teste}`}
        </p>
    </div>
  );
}

export default App;
