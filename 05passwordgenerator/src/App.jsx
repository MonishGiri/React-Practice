import { useState, useCallback,useEffect, userRef, useRef } from 'react'
import './App.css';

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState()

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "~!@#$%^&*()-_=+[{]}|;:,.<>/?`";

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length,numberAllowed, charAllowed, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() =>{
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
<div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
  <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md">
    <h2 className="text-center text-lg font-medium mb-4">Password Generator</h2>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start">
        <input
          type="text"
          placeholder="Password"
          value={password}
          ref={passwordRef}
          className="w-full p-3 text-orange-600 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          readOnly
        />
        <button
          onClick={copyPasswordtoClipboard}
          className="bg-blue-700 text-white mt-2 md:mt-0 md:ml-2 px-4 py-2 rounded"
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col gap-2 text-sm text-orange-600">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="lengthRange">Length: {length}</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>

          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default App
