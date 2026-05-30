import { useEffect, useState, useRef } from 'react'
import GameBoard from './gameBoard'
import './App.css'
import Controller from './controller';


function App() {
  const [gameState, setGameState] = useState();
  const [uid, setUid] = useState();
  const ws = useRef(null);
  const isRemoteUpdate = useRef(false); // track whether state change came from server

  const gameController = new Controller(gameState, setGameState);

  // connect once on mount
  useEffect(() => {
    let cancelled = false; // flag for intentional unmount
    function connect() {
      const socket = new WebSocket('ws://localhost:8081');
      ws.current = socket;

      socket.onopen = () => console.log('Connected to server');

      //get remote update from server
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        //assign uid if sent
        parsedData.uid? setUid(parsedData.uid) : null;
        console.log('from server', parsedData);
        isRemoteUpdate.current = true;  // flag: this state change came from server
        setGameState(parsedData);
      };

      socket.onclose = () => {
        if(cancelled) return; //don't reconnect on unmount
        console.log('Disconnected. Reconnecting...');
        setTimeout(() => {
          connect();
        }, 1000);
      };
    }
    connect()
    return () => {
      cancelled = true;
      if (ws.current?.readyState === WebSocket.CONNECTING) {
        ws.current.onopen = () => ws.current.close(); // wait until open, then close
      } else {
        ws.current?.close();
      }
    }; // cleanup on unmount
  }, []);

  // send state to server only when client changed it
  useEffect(() => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }
    if (ws.current?.readyState === WebSocket.OPEN) {
      console.log('sending state', gameState);
      ws.current.send(JSON.stringify(gameState));
    }
  }, [gameState]);

  return (
    <>
      <h1>{uid? uid : "Connecting..."}</h1>
      <GameBoard gameController={gameController} handleClick={gameController.handleClick} />
      <div id='messages'></div>
    </>
  )
}

export default App