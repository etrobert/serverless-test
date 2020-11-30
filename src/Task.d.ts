type Status = 'TODO' | 'DONE';

interface Task {
  id: string;
  name: string;
  status: Status;
}

export { Task, Status };
