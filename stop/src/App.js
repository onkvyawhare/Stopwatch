import {useState,useEffect} from "react";
 
function Stopwatch() {

  const [elapsedTime,setElapsedTime]=useState(0);
  const[isrunning,setIsRunning]=useState(false);

  const formatTime=(seconds)=>{
    const mins=Math.floor(seconds/60);
    const remainingseconds=seconds%60;
    return `${mins}:${remainingseconds < 10 ? "0":""}${remainingseconds}`
  };

  const startStop=()=>{
    setIsRunning(!isrunning);
  }

  const reset=()=>{
    setIsRunning(false);
    setElapsedTime(0);
  }

  useEffect(() => {
    let IntervalId;
    if(isrunning){
      IntervalId=setInterval(()=>{
        setElapsedTime((prev)=>prev+1);
      },1000)
    }

    return() => clearTimeout(IntervalId);
  
    
  }, [isrunning]);
  
  return (
    <div >
     <h1>Stopwatch</h1> 
     <p>Time:{formatTime(elapsedTime)}</p>
     <button onClick={startStop}>{isrunning ? "Stop":"Start"}</button>
     <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
