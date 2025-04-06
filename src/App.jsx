import React from "react";
import AlchemySettings from "./components/AlchemySettings";
import "./App.css";
import logo from "./assets/breaking-cow-logo.png";

function App() {
  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <img
          src={logo}
          alt="Breaking Cow"
          style={{
            height: '60px',
            marginRight: '1rem',
            borderRadius: '8px',
            boxShadow: '0 0 8px #13ff8f88'
          }}
        />
        <h1 style={{
          fontSize: '1.8rem',
          color: '#a9ffae',
          textShadow: '0 0 6px #1dbf70'
        }}>
          Breaking Cow - Alchemy Calculator
        </h1>
      </header>

      <AlchemySettings />
    </div>
  );
}

export default App;
