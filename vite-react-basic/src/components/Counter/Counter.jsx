import React, { useState } from 'react';
import './Counter.sass';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>TEST NAVI</div>
      <div className="counter">
        <h1>Counter</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </>
  );
};

export default Counter; 
