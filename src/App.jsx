import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import History from "./components/History.jsx";
import Timerwindow from "./components/Timerwindow.jsx";

const Root = styled.div`
  color: black;
`;
const Container = styled.div`
  width: 500px;
  height: 500px;
  text-align: center;
  margin: 0 auto;

  .title {
    padding-top: 1rem;
    font-size: 2rem;
  }
  .button {
    margin: 0 auto;
  }

  .lap-line {
    margin: 0.4rem 0;
    font-size: 1rem;
  }
`;

function App() {
  const [timer, setTimer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [histories, setHistories] = useState([]);

  const startTimer = useCallback(() => {
    if (timer === null) {
      setTimer(
        setInterval(() => {
          setCurrentTime((currentTime) => currentTime + 1);
        }, 10)
      );
    }
  });
  const pauseTimer = useCallback(() => {
    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }
  });
  const resetTimer = useCallback(() => {
    pauseTimer();
    setCurrentTime(0);
    setHistories([]);
  });

  const createLap = useCallback(() => {
    setHistories((histories) => [...histories, currentTime]);
  });

  return (
    <Root>
      <Container>
        <div className="title">stopwatch</div>
        <Timerwindow>{(currentTime / 100).toFixed(2)}</Timerwindow>
        <div className="button">
          <div>
            <Button
              onClick={() => {
                startTimer();
              }}
              variant="outlined"
              disabled={timer !== null}
            >
              start
            </Button>
            <Button
              onClick={() => {
                pauseTimer();
              }}
              variant="outlined"
              disabled={timer === null}
            >
              pause
            </Button>
            <Button
              onClick={() => {
                resetTimer();
              }}
              variant="outlined"
            >
              reset
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                createLap();
              }}
              variant="outlined"
              disabled={timer === null}
            >
              lap
            </Button>
            <Button
              onClick={() => {
                setHistories([]);
              }}
              variant="outlined"
            >
              clear
            </Button>
          </div>
        </div>
        <div>
          {histories.map((history, idx) => (
            <History
              history={history}
              key={`histories-${idx}`}
              order={idx + 1}
            />
          ))}
        </div>
      </Container>
    </Root>
  );
}

export default App;
