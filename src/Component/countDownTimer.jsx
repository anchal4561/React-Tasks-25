import React, { useEffect, useState } from 'react'
import '../App.css';

const CountDownTimer = () => {

    const [isStart, setIsStart] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerId,setTimerId]=useState(0);
    const handleStart = () => {

        if(hours<0 || minutes<0 ||seconds<=0){
            alert("invalid input");
            return;
        }
        else{
            setIsStart(true);
        }
    }

    const handleReset = () => {
        setIsStart(false);
        resetTimer();
    }

    const resetTimer=()=>{
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        clearInterval(timerId);

    }
    
    const handlePausebtn=()=>{
        setIsPaused(true);
        clearInterval(timerId);
    }

    const handleResumeBtn=()=>{
        setIsPaused(false);
        playTimer(seconds,minutes,hours)
    }

    const handleChangeInput=(e)=>{
        let val=parseInt(e.target.value);
        if(e.target.id=="hours"){
            setHours(val);
        }
        else if (e.target.id=="minutes"){
            setMinutes(val);
        }
        else if (e.target.id=="seconds"){
            setSeconds(val);
        }
    }

    const playTimer=(sec,min,hr,tid)=>{
        if(sec>0){
            setSeconds((s)=>s-1)
        }
        else if(sec===0 && min>0){
            setMinutes((m)=>m-1);
            setSeconds(59);
        }
        else{
            setHours((h)=>h-1);
            setMinutes(59)
            setSeconds(59);
        }

        if(sec==0 && min==0 && hr==0){
            resetTimer()
            alert("Timer is completed");
            return;
        }
    }
    useEffect(()=>{
        let tid;
        if(isStart){
            tid= setInterval(()=>{
                playTimer(seconds,minutes,hours,tid)
            },1000)
            setTimerId(tid);
        }
        return()=>{
            clearInterval(tid);
        }
    },[isStart,hours,minutes,seconds])
    return (
        <div className='App'>
            <h1>Countdown Timer</h1>
            {!isStart &&
                <div className='input-container'>
                    <div className='input-box'>
                        <input
                            // value={ hours}
                            onChange={handleChangeInput}
                            id="hours" placeholder='HH' />
                        <input
                            // value={minutes }
                            onChange={handleChangeInput}
                            id="minutes" placeholder='MM' />
                        <input id="seconds"
                            // value={seconds }
                            onChange={handleChangeInput}
                            placeholder='SS' />
                    </div>
                    <button className='timer-buttons'
                        onClick={handleStart}
                    >Start</button>
                </div>
            }
            {isStart &&
                (<div className='show-container'>
                    <div className='timer-box'>
                        <div>{hours<10?`0${hours}`: hours}</div>
                        <span>:</span>
                        <div>{minutes<10?`0${minutes}`: minutes}</div>
                        <span>:</span>
                        <div>{seconds<10?`0${seconds}`: seconds}</div>
                    </div>
                    <div className='action-container'>
                        {!isPaused &&<button className='timer-buttons'
                        onClick={handlePausebtn}
                        >Pause</button>}
                        {isPaused &&<button className='timer-buttons'
                        onClick={handleResumeBtn}
                        >Resume</button>}
                        <button className='timer-buttons'
                            onClick={handleReset}>Reset</button>
                    </div>
                </div>)}
        </div>
    )
}

export default CountDownTimer;