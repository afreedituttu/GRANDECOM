import React, { useEffect, useState } from 'react'

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(()=>{
      const timer = setTimeout(()=>{
          setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => {clearTimeout(timer)};
    });

    function calculateTimeLeft() {
      const differece = + new Date('2023-10-30') - new Date();
      let timeLeft = {};
      
      if(differece > 0){
        timeLeft = {
          days: Math.floor(differece / (1000 * 60 * 60 * 24)),
          hours: Math.floor(differece / (1000 * 60 * 60)) % 24,
          minutes: Math.floor(differece / (1000 * 60) % 60),
          seconds: Math.floor(differece / (1000) % 60),
        }
      }

      return timeLeft;
    }
    
    const timerComponent = Object.keys(timeLeft).map((interval) => {
      if(!timeLeft[interval]){
        return null
      }
      return(
        <span className='text-[25px] text-[#475ad2] '>
          {timeLeft[interval]} {interval} {" "}
        </span>
      )
    });

  return (
    <div className="">
      {timerComponent.length ? timerComponent : <span className='text-[red] text-[25px]'>Time's Up</span>}
    </div>
  )
}

export default CountDown
