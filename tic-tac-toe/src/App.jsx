import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function loadScript() {
  if(!window.isScriptLoaded){
    window.isScriptLoaded = true;
    const ws = new WebSocket('ws://localhost:8081');

      ws.onopen = () => {
          console.log('Connected to server');
      };

      ws.onmessage = (event) => {
          const messages = document.getElementById('messages');
          const newMessage = document.createElement('div');
          newMessage.textContent = `Server: ${event.data}`;
          messages.appendChild(newMessage);
      };

      ws.onclose = () => {
          console.log('Disconnected from server');
      };

      document.getElementById('send').addEventListener('click', () => {
          const input = document.getElementById('message');
          ws.send(input.value);
          input.value = '';
      });
  }
}

function App() {

  useEffect(() =>{
    loadScript();
    return
  },[])

  return (
    <>
      <h1>Websocket Client</h1>
      <input type='text' id='message' placeholder='Type a message'/>
      <button id='send'>Send</button>
      <div id='messages'></div>
      
    </>
  )
}

export default App
