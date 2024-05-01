
import {useState, useEffect} from "react";
 
function Stopwatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${mins}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setElapsedTime((Date.now() - startTime) / 1000); // Calculate elapsed time
    } else {
      setIsRunning(true);
      setStartTime(Date.now()); // Record start time
    }
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((Date.now() - startTime) / 1000); // Calculate elapsed time
      }, 1000);
    } else {
      clearInterval(intervalId); // Clear the interval
    }

    return () => clearInterval(intervalId); // Cleanup interval on component unmount

  }, [isRunning, startTime]);

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(elapsedTime)}</p>
      <button onClick={startStop}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
