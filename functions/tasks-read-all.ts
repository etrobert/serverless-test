import { Task, Status as TaskStatus } from '../src/Task';
import handleError from './utils/handleError';
import sendQuery from './utils/sendQuery';

interface Answer {
  allTasks: {
    data: AnswerItem[];
  };
}

interface AnswerItem {
  _id: string;
  name: string;
  status: TaskStatus;
}
const renameId = (task: AnswerItem) => ({
  id: task._id,
  name: task.name,
  status: task.status,
});

const query = `
  query {
    allTasks {
      data {
        _id
        name
        status
      }
    }
  }
`;

// Warning: context includes properties and methods specific to Netlify
// such as Netlify Identity
exports.handler = async () => {
  try {
    const data = (await sendQuery(query)) as Answer;
    // TODO Validate the response
    const tasks: Task[] = data.allTasks.data.map(renameId);
    return { statusCode: 200, body: JSON.stringify(tasks) };
  } catch (error) {
    return handleError(error);
  }
};
