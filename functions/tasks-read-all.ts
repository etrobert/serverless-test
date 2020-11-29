import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Task } from '../src/Task';
import axios from 'axios';

interface AnswerItem {
  _id: string;
  name: string;
}
const renameId = (task: AnswerItem) => ({ id: task._id, name: task.name });

const ok = (httpStatus: number) => httpStatus >= 200 && httpStatus < 300;

const query = `
  query {
    allTasks {
      data {
        _id
        name
      }
    }
  }
`;

// Warning: context includes properties and methods specific to Netlify
// such as Netlify Identity
exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
  try {
    const { status, data } = await axios({
      url: 'https://graphql.fauna.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      },
      data: {
        query,
        variables: {},
      },
    });
    if (!ok(status)) return { statusCode: status, body: JSON.stringify(data) };

    const tasks: Task[] = data.data.allTasks.data.map(renameId);
    return { statusCode: 200, body: JSON.stringify(tasks) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ msg: err.msg }) };
  }
};
