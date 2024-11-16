import React from "react";
import "./PassGenerator.css";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";

function PassGenerator() {
    // defining variables
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!#$%&()*+,-/:;<=>?@[]^_{}~";


  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(6);
  const [isUppercase, setisUppercase] = useState(true);
  const [isLowercase, setisLowercase] = useState(true);
  const [isNumber, setisNumber] = useState(true);
  const [isSymbol, setisSymbol] = useState(true);

  const increaseCounter = (e) => {
    e.preventDefault();
    if (counter < 20) {
        setCounter((prevCounter) => prevCounter + 1)
    }
  };

  const decreaseCounter = (e) => {
    e.preventDefault();
    if (counter > 6) {
        setCounter((prevCounter) => prevCounter - 1)
    }
  };
  


  const generatePassword = (e) => {
    e.preventDefault();

    let _password = "";

    for (let i = 0; i < counter; i++) {
        _password += getRandom();
    }
    setPassword(_password);
  }

  const createCopy = (params) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  const copyPasswordHandler = (e) => {
    e.preventDefault();
    createCopy();

    if (password.trim().length === 0) {
        toast("There is nothing to Copy", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }
    else{
        toast("Copied to clipboard", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }
  }
  
  

const getRandom = () => {
  const chars = [];

  if(isUppercase){
    chars.push(upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]);
  }
  if(isLowercase){
    chars.push(lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)]);
  }
  if(isNumber){
    chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
  }
  if(isSymbol){
    chars.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }
  if(chars.length === 0) return;

  return chars[Math.floor(Math.random() * chars.length)];

}


  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
      {/* Same as */}
      <ToastContainer />
    <div className="App">
      <div className="generator">
        <h2 className="generator__title">Password Generator</h2>
        <h4 className="password">{password}</h4>

        <form className="generator__form">
          <div className="generator__form-controls">
            <div className="generator__form-control">
              <label htmlFor="uppercase">Uppercase</label>
              <input checked={isUppercase} onChange={(e) => setisUppercase(e.target.checked)} type="checkbox" id="uppercase" name="uppercase" />
            </div>
            <div className="generator__form-control">
              <label htmlFor="lowercase">Lowercase</label>
              <input checked={isLowercase} onChange={(e) => setisLowercase(e.target.checked)} type="checkbox" id="lowercase" name="lowercase" />
            </div>
            <div className="generator__form-control">
              <label htmlFor="numbers">Numbers</label>
              <input checked={isNumber} onChange={(e) => setisNumber(e.target.checked)} type="checkbox" id="numbers" name="numbers" />
            </div>
            <div className="generator__form-control">
              <label htmlFor="symbols">Symbols</label>
              <input checked={isSymbol} onChange={(e) => setisSymbol(e.target.checked)} type="checkbox" id="symbols" name="symbols" />
            </div>

            <div className="generator__length">
              <h4 className="generator__length-title">Password Length</h4>
              <div className="generator__length-counter">
                <button onClick={decreaseCounter}>-</button>
                <span>{counter}</span>
                <button onClick={increaseCounter}>+</button>
              </div>
            </div>

            <div className="generator__form-actions">
              <button onClick={generatePassword} className="btn generate-btn">Generate Password</button>
              <button onClick={copyPasswordHandler} className="btn copy-btn">Copy Password</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default PassGenerator;
