import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import { Task } from './Task';
import useTasks, { Status } from './useTasks';

function App() {
  const { status, tasks } = useTasks();
  const renderContent = () => {
    // prettier-ignore
    switch (status) {
      case Status.Loading: return <p>Loading</p>;
      case Status.Error: return <p>Error</p>;
      case Status.Done: return <ul>{tasks.map(renderTask)}</ul>;
    }
  };
  const renderTask = (task: Task) => <li key={task.id}>{task.name}</li>;
  return <div className="App">{renderContent()}</div>;
}

export default hot(module)(App);
