import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import { Todo } from './Todo';
import useTodos, { Status } from './useTodos';

function App() {
  const { status, todos } = useTodos();
  const renderContent = () => {
    // prettier-ignore
    switch (status) {
      case Status.Loading: return <p>Loading</p>;
      case Status.Error: return <p>Error</p>;
      case Status.Done: return <ul>{todos.map(renderTodo)}</ul>;
    }
  };
  const renderTodo = (todo: Todo) => <li key={todo.id}>{todo.name}</li>;
  return <div className="App">{renderContent()}</div>;
}

export default hot(module)(App);
