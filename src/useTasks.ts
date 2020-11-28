import { useEffect, useState } from 'react';
import { Task } from './Task';

const enum Status {
  Loading,
  Error,
  Done,
}

function useTasks() {
  const [status, setStatus] = useState<Status>(Status.Loading);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch('.netlify/functions/tasks-read-all');
      if (!response.ok) {
        setStatus(Status.Error);
        return;
      }
      const tasks = await response.json();
      // TODO check response
      setTasks(tasks);
      setStatus(Status.Done);
    };
    loadTasks();
  }, []);

  return { status, tasks };
}

export default useTasks;
export { Status };
