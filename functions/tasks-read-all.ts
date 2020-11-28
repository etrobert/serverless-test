import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Task } from '../src/Task';

// Warning: context includes properties and methods specific to Netlify
// such as Netlify Identity
exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
  const tasks: Task[] = [
    { id: 1, name: 'COucou' },
    { id: 2, name: 'Tâche 2' },
  ];
  return {
    statusCode: 200,
    body: JSON.stringify(tasks),
  };
};
