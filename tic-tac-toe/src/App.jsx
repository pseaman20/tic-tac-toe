import { useEffect, useState, } from 'react'
import { GameContext } from './game-context';
import GameBoard from './gameBoard'
import './App.css'
import { useContext } from 'react';

  let mounted = false;
  const initGameState = {
        playerTurn : -1,
        board : [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']],

    }

function connect() {
    const ws = new WebSocket('ws://localhost:8081');

    ws.onopen = () => {
        console.log('Connected to server');
    };

    ws.onclose = () => {
        console.log('Disconnected. Reconnecting...');
        setTimeout(connect, 1000);
    };
    return ws;
}

function App() {
  const [gameState, setGameState] = useState(initGameState);
  useEffect(() =>{
    if(mounted == false){
      mounted = true;
      const ws = connect();
      
      //should update based on gamedata received
      ws.onmessage = (event) => {
          console.log("from server",JSON.parse(event.data));
          setGameState(JSON.parse(event.data));
      };
      console.log(ws);
    }
    return
  },[])


  return (
    <>
      <h1>Websocket Client</h1>
      <button id='send' onClick={() =>console.log(gameState)}>Send</button>
      <GameBoard gameState={gameState}/>
      <div id='messages'></div>
    </>
  )
}

export default App
