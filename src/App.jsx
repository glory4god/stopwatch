import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const Root = styled.div`
  color: black;
`;
const Container = styled.div`
  background-color: white;
  width: 50vh;
  height: 50vh;
  text-align: center;

  .title {
    padding-top: 1rem;
  }
  .button {
    margin: 0 auto;
  }
  .history {
  }
`;
const History = ({ history, order }) => {
  return (
    <div>
      {order}: {(history / 100).toFixed(2)}
    </div>
  );
};

const Timerwindow = styled(Paper)`
  margin: 0.5rem 5rem 0.5rem 4.7rem;
  width: 30vh;
  height: 10vh;
  font-size: 3rem;
`;

function App() {
  const [timer, setTimer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [histories, setHistories] = useState([]);

  const startTimer = () => {
    if (timer === null) {
      setTimer(
        setInterval(() => {
          setCurrentTime((prev) => prev + 1);
        }, 10)
      );
    }
  };
  const pauseTimer = () => {
    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }
  };
  const resetTimer = () => {
    pauseTimer();
    setCurrentTime(0);
  };

  const createLap = () => {
    setHistories((histories) => [...histories, currentTime]);
  };

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
        <div className="history">
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
