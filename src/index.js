import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container)


// ReactDOM.render(<App />, document.getElementById('app')) 
root.render(<App tab="home" />)