import { APIGatewayProxyEvent } from 'aws-lambda';
import handleError from './utils/handleError';
import sendQuery from './utils/sendQuery';

// TODO Remove _id return
const query = `
  mutation($id: ID!, $name: String, $status: TaskStatus) {
    partialUpdateTask(id: $id, data: { name: $name, status: $status }) {
      _id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateBody = (body: any) => !!body.id;

exports.handler = async (event: APIGatewayProxyEvent) => {
  try {
    if (!event.body) throw Error('Missing body');
    const body = JSON.parse(event.body);
    if (!validateBody(body)) throw Error('Invalid body');
    await sendQuery(query, body);
    return { statusCode: 200 };
  } catch (error) {
    return handleError(error);
  }
};
