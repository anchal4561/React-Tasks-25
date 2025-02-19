import { use, useEffect, useState } from "react"
import './App.css';

function App() {

  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isrunning, setIsRunning] = useState(false);
  const [countDownTime, setCountDownTime] = useState(null);
  const [text,setText]=useState("Start");

  useEffect(() => {
    if (!isrunning) return;
    let interval = setInterval(() => {
      setSeconds(previousSec => {
        let newSec = previousSec - 1
        if (newSec < 0) {
          newSec = 59;
          setMinute(prevMin => {
            let newMin = prevMin - 1;
            if (newMin < 0) {
              newMin = 59;
              setHour(prevHour => prevHour - 1)
            }
            return newMin
          })
        }
        return newSec;
      })
    }, 1000)

    setCountDownTime(interval);

    return () => clearInterval(interval);
  }, [isrunning])

  useEffect(() => {

    if (minute > 60 && seconds > 60) {
      setSeconds(prev => parseInt(prev) - 59);
      setMinute(prev => parseInt(prev) - 60);
      setHour(prev => parseInt(prev) + 1);
    }

    else if (seconds > 60) {
      setMinute(prev => parseInt(prev) + 1)
      setSeconds(prev => parseInt(prev) - 59)
    }
    else if (minute > 60) {
      setHour(prev => parseInt(prev) + 1);
      setMinute(prev => parseInt(prev) - 60)
    }


    if (hour <= 0 && minute <= 0 && seconds <= 0 && isrunning) {
      setIsRunning(false);
      if (countDownTime) {
        clearInterval(countDownTime);
        setCountDownTime(null);
      }
    }

    if (seconds != 0) {
      setSeconds(`${seconds <= 10 ? "0" : ""}${seconds - 1}`)
    }
    else if (minute != 0 && seconds == 0) {
      setSeconds(59)
      setMinute(`${minute <= 10 ? "0" : ""}${minute - 1}`)
    }
    else if (hour != 0 && minute == 0) {
      setMinute(60);
      setHour(`${hour <= 10 ? "0" : ""}${hour - 1}`)
    }

  }, [isrunning, countDownTime])

  const startTimer = () => {
    if (hour == 0 && minute == 0 && seconds == 0) return;
    setIsRunning(true);
  }

  const resetTimer = () => {
    setHour('');
    setMinute('');
    setSeconds('');
    setIsRunning(false)
    setText("start")
    if (countDownTime) {
      clearInterval(countDownTime);
      setCountDownTime(null)
    }
  }

  const stopTimerFn=(step)=>{
    setText(step=="pause"?"Continue":"Start")
  }

  const stopTimer = () => {
    setIsRunning(false);
    stopTimerFn("pause");
    if (countDownTime) {
      clearInterval(countDownTime);
      setCountDownTime(null);
    }
  }
  const handleInput = (e, setData) => {
    let val = e && e.target.value;
    if (val && (val.length > 2)) {
      val = val.slice(0, 2);
    }
    val = val && val.replace(/[^0-9]/g, '')
    if (/^\d*$/.test(val)) {
      setData(val);
    }
  }
  return (
    <div className="container">
      <span className="container-title">
        Countdown Timer
      </span>
      <div className="labels">
        <p className="label">Hours</p>
        <p className="label">Minutes</p>
        <p className="label">Seconds</p>
      </div>
      <div className="inputs">
        <input
          type="number"
          value={hour}
          onChange={(e) => handleInput(e, setHour)}
          className="input-hour"
          placeholder="00"
          disabled={isrunning}
        />
        <p className="input-colom">:</p>
        <input
          type="number"
          value={minute}
          onChange={(e) => handleInput(e, setMinute)}
          className="input-minute"
          placeholder="00"
          disabled={isrunning}

        />
        <p className="input-colom">:</p>
        <input
          type="number"
          value={seconds}
          onChange={(e) => handleInput(e, setSeconds)}
          className="input-seconds"
          placeholder="00"
          disabled={isrunning}

        />

      </div>

      <div className="buttons">
        <button className={"btn start" + (isrunning ? " d-none" : "")}
          onClick={startTimer} disabled={isrunning}>{text}</button>
        <button className={"btn stop" + (!isrunning ? " d-none" : "")}
          onClick={stopTimer} disabled={!isrunning}>Stop</button>
        <button className="btn reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
