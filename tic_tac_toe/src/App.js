import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" tabIndex={-1} style={{ opacity: 0.3, pointerEvents: 'none'}}>Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h1 className="title" style={{ marginTop: "88px", color: "#222222", fontFamily: "inherit", fontWeight: "bold", marginBottom: "0.5em" }}>
            TicTacToe Classic
          </h1>
          <div className="subtitle" style={{ color: "#4caf50", marginBottom: 18 }}>
            Play with a friend! First to three in a row wins.
          </div>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;