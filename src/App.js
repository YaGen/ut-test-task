import React from "react";
import { connect } from "redux-zero/react";
import actions from "./actions";
import Button from "./components/Button";
import Counter from "./components/Counter";
import Letter from "./components/Letter";

class App extends React.Component {
  componentWillMount() {
    document.addEventListener("keypress", this.props.pressKeyHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.props.pressKeyHandler);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error:
        this.props.mistakesCount !== nextProps.mistakesCount &&
        nextProps.mistakesCount !== 0
    });
  }

  renderCounters = () => {
    const { timeLeft, time, mistakesCount, symbolsLeft } = this.props;
    return (
      <React.Fragment>
        <Counter label={"Времени осталось"} value={`${timeLeft} c`} />
        <Counter label={"Времени прошло"} value={`${time} c`} />
        <Counter label={"Количество ошибок"} value={mistakesCount} />
        <Counter label={"Осталось символов"} value={symbolsLeft} />
      </React.Fragment>
    );
  };

  render() {
    const {
      appStarted,
      task,
      startTrainer,
      finishTrainer,
      isTrainerFinished
    } = this.props;
    return appStarted ? (
      <React.Fragment>
        {this.renderCounters()}
        {task
          .split("")
          .map((el, idx) => (
            <Letter
              key={idx}
              value={el}
              isCurrentLetter={idx === 0}
              isErrorLetter={idx === 0 && this.state.error}
            />
          ))}
        {isTrainerFinished ? (
          <Button value={"Заново"} clickHandler={startTrainer} />
        ) : (
          <Button value={"Закончить"} clickHandler={finishTrainer} />
        )}
      </React.Fragment>
    ) : (
      <Button value={"Старт"} clickHandler={startTrainer} />
    );
  }
}

const mapStateToProps = ({
  appStarted,
  isTrainerFinished,
  mistakesCount,
  task,
  time
}) => ({
  appStarted,
  isTrainerFinished,
  mistakesCount,
  task,
  symbolsLeft: task.length,
  time,
  timeLeft: 60 - time
});
export default connect(mapStateToProps, actions)(App);
