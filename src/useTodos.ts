import { useEffect, useState } from 'react';
import { Todo } from './Todo';

const enum Status {
  Loading,
  Error,
  Done,
}

function useTodos() {
  const [status, setStatus] = useState<Status>(Status.Loading);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const response = await fetch('.netlify/functions/todos-read-all');
      if (!response.ok) {
        setStatus(Status.Error);
        return;
      }
      const todos = await response.json();
      // TODO check response
      setTodos(todos);
      setStatus(Status.Done);
    };
    loadTodos();
  }, []);

  return { status, todos };
}

export default useTodos;
export { Status };
