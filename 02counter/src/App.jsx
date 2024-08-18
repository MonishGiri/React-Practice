import {useState} from 'react';
import './App.css'

function App() {

  const [counter,setCounter] = useState(15);

  // let counter = 5;

  const addValue = () =>{
    if(counter >= 20) return;
    setCounter(counter + 1)
    // console.log('Clicked',counter);
  }

  const lowValue = () =>{
    if(counter <= 0) return;
    setCounter(counter-1);
  }
  return (
    <>
      <h1>React</h1>
      <h2>Counter value: {counter}</h2>

      <button
        onClick={addValue}
      >Add value {counter}</button>
       <br /> <br />
      <button
        onClick={lowValue}
      >Low value {counter}</button>
      <p>Footer: {counter}</p>
    </>
  )
}

export default App
