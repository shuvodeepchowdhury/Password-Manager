import { useState } from 'react'
import Navbar from "./components/Navbar";
import './App.css'
import Manager from './components/Manager';
import PassGenerator from "./components/PassGenerator";

function App() {

  return (
    <>
      <Navbar />
      <Manager />
      <PassGenerator />
    </>
  )
}

export default App
