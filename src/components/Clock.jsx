import React, { useState, useEffect } from 'react';

function Clock() {
  const [clock, setClock] = useState(new Date().toLocaleString([], { hour: '2-digit', hour12: true, minute: '2-digit' }));
  useEffect(() => {
    // setInterval -> ejetuta una función en intervalos
    const interval = setInterval(() => {
      // toLocaleString([locale [, options]]);
      setClock(new Date().toLocaleString([], { hour: '2-digit', hour12: true, minute: '2-digit' }));
    }, 1000);
    // clearInterval -> borra intervalos
    return () => clearInterval(interval);
  }, []);

  return (
    <>{ clock }</>
  );
}

export default Clock;
