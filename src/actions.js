const generateTask = length => {
  let text = "";
  const possible =
    "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789";
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

const getInterval = store => {
  const interval = setInterval(() => {
    const time = store.getState().time;
    if (time < 60) {
      store.setState({
        time: time + 1
      });
    }
  }, 1000);
  return () => {
    clearInterval(interval);
    store.setState({
      isTrainerFinished: true
    });
  };
};

const actions = store => ({
  startTrainer: state => {
    if (state.interval) {
      state.interval();
    }
    store.setState({
      appStarted: true,
      isTrainerFinished: false,
      time: 0,
      mistakesCount: 0,
      task: generateTask(10),
      interval: getInterval(store)
    });
  },

  finishTrainer: () => {
    store.getState().interval();
  },

  pressKeyHandler: ({ task, mistakesCount, isTrainerFinished }, e) => {
    if (isTrainerFinished) return;
    if (e.key === task.charAt(0)) {
      const newTask = task.substr(1);
      store.setState({ task: newTask });
      if (newTask.length === 0) {
        store.getState().interval();
      }
    } else {
      store.setState({ mistakesCount: mistakesCount + 1 });
    }
  }
});

export default actions;
