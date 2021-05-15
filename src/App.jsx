import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import History from './components/History.jsx';
import Timerwindow from './components/Timerwindow.jsx';

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

const App = () => {
  const [timer, setTimer] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [histories, setHistories] = React.useState([]);

  const startTimer = React.useCallback(
    (currentTime) => {
      if (timer === false) {
        setTimer(
          setInterval(() => {
            setCurrentTime((currentTime) => currentTime + 1);
          }, 10),
        );
      }
    },
    [timer],
  );

  const pauseTimer = React.useCallback(
    (currentTime) => {
      if (timer !== false) {
        clearInterval(timer);
        setTimer(false);
      }
    },
    [timer],
  );
  const resetTimer = React.useCallback(
    (timer, histories) => {
      pauseTimer();
      setCurrentTime(0);
      setHistories([]);
    },
    [pauseTimer],
  );

  const createLap = React.useCallback(
    (histories) => {
      setHistories((histories) => [...histories, currentTime]);
    },
    [currentTime],
  );

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
              disabled={timer !== false}>
              start
            </Button>
            <Button
              onClick={() => {
                pauseTimer();
              }}
              variant="outlined"
              disabled={timer === false}>
              pause
            </Button>
            <Button
              onClick={() => {
                resetTimer();
              }}
              variant="outlined">
              reset
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                createLap();
              }}
              variant="outlined"
              disabled={timer === false}>
              lap
            </Button>
            <Button
              onClick={() => {
                setHistories([]);
              }}
              variant="outlined">
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
};

export default App;
