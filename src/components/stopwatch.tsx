import React, { useRef, useState } from "react";
import styled from "styled-components";

const Stopwatch = () => {
  // Getting time in milliseconds
  const [time, setTime] = useState<number>(0);

  // Checking is timer is running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Created this to trach the interval of the timer
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Formatting time in Hours:Minutes:Seconds:Milliseconds
  const formatTime = (time: number): string => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  // Getting list of the laps
  const [stoppedTimes, setStoppedTimes] = useState<number[]>([]);

  // Created this function to hand start and pause the timer
  const handleStartPause = () => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1);
    }
    setIsRunning(!isRunning);
  };

  // Handling stop button functionality
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setStoppedTimes([time, ...stoppedTimes]);
    setTime(0);
  };

  // Handling reset button functionality
  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    setIsRunning(false);
  };

  return (
    <StyledDiv>
      <div className="stopwatch">
        <div className="stopwatch__heading">Stop Watch</div>
        <div className="stopwatch__timer" id="timer">
          <h2>{formatTime(time)}</h2>
        </div>
        <div className="stopwatch__ctaBtn">
          <button
            className="stopwatch__ctaBtn-toggle"
            onClick={handleStartPause}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="stopwatch__ctaBtn-stop" onClick={handleStop}>
            Stop
          </button>
          <button className="stopwatch__ctaBtn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* <StyledTimeList className="timers">
          <h2 className="timers__heading">List of the Stopped Times</h2>
          <ul className="timers__list">
            {stoppedTimes.map((stoppedTime, index) => (
              <li key={index}>{formatTime(stoppedTime)}</li>
            ))}
          </ul>
        </StyledTimeList> */}
      </div>
    </StyledDiv>
  );
};

export default Stopwatch;

const StyledDiv = styled.div`
  .stopwatch {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__heading {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
      text-transform: uppercase;
      text-align: center;
    }

    &__timer {
      height: 200px;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 5px solid black;
     
      border-radius: 50%;
      margin-bottom: 1.5rem;
    }

    &__ctaBtn {
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      margin-bottom: 2rem;

      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 10px;
        font-size: 1rem;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        border: none;
        outline: none;
        color: #ffffff;
      }

      &-toggle {
        width: 80px;
        background-color: #059212;
      }

      &-stop {
        background-color: #4b70f5;
      }

      &-reset {
        background-color: #ee4e4e;
      }
    }
  }
`;

const StyledTimeList = styled.div`
  .timers {
    &__heading {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
      text-transform: uppercase;
      text-align: center;
    }

    &__list {
      list-style: none;
      text-align: center;

      li {
        font-size: 2.5rem;
        padding: 0.5rem 1rem;
      }
    }
  }
`;
