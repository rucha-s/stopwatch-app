import React, { useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0faff;
  font-family: 'Roboto', sans-serif;
`;

const TimerCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 100%;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    transform: scale(1.03);
    background-color: #f7fcff;
  }
`;

const Header = styled.div`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`;

const TimerDisplay = styled.div`
  background-color: #e9f5ff;
  border-radius: 10px;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s;
`;

const TimeUnit = styled.div`
  font-size: 2.2rem;
  font-weight: 500;
  color: #2c3e50;
  text-align: center;
  margin: 0 10px;

  & span {
    display: block;
    font-size: 0.8rem;
    font-weight: normal;
    color: #888888;
    margin-top: 5px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
`;

const ControlButton = styled.button`
  background-color: #3498db;
  border: none;
  color: white;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 10px;
  width: 100px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #1e6b8e;
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

const TimeList = styled.ul`
  margin-top: 30px;
  padding: 0;
  list-style: none;
  color: #555;
  font-size: 1rem;
  width: 100%;
`;

const TimeListItem = styled.li`
  margin-bottom: 10px;
  background-color: #e0f7fa;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s;

  &:hover {
    background-color: #b2ebf2;
  }
`;

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const timerRef = useRef(null);

  const startPauseTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current); 
    setIsRunning(false);

    const finalTime = formatTime(time);
    setTimeList([
      ...timeList,
      `${finalTime.getHours}h ${finalTime.getMinutes}m ${finalTime.getSeconds}s`,
    ]);
    setTime(0);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setTimeList([]);
  };

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    const days = `${Math.floor(seconds / 86400)}`;
    const getDays = `0${days}`.slice(-2);
    return { getDays, getHours, getMinutes, getSeconds };
  };

  const { getDays, getHours, getMinutes, getSeconds } = formatTime(time);

  return (
    <Container>
      <TimerCard>
        <Header>Stopwatch</Header>
        <TimerDisplay>
          <TimeUnit>
            {getDays}
            <span>Days</span>
          </TimeUnit>
          <TimeUnit>
            {getHours}
            <span>Hours</span>
          </TimeUnit>
          <TimeUnit>
            {getMinutes}
            <span>Minutes</span>
          </TimeUnit>
          <TimeUnit>
            {getSeconds}
            <span>Seconds</span>
          </TimeUnit>
        </TimerDisplay>
        <ButtonsContainer>
          <ControlButton onClick={startPauseTimer}>
            {isRunning ? "Pause" : "Start"}
          </ControlButton>
          <ControlButton onClick={stopTimer}>Stop</ControlButton>
          <ControlButton onClick={resetTimer}>Reset</ControlButton>
        </ButtonsContainer>
        <TimeList>
          {timeList.map((time, index) => (
            <TimeListItem key={index}>{time}</TimeListItem>
          ))}
        </TimeList>
      </TimerCard>
    </Container>
  );
};

export default Stopwatch;
