import { APIGatewayProxyResult } from 'aws-lambda';

function handleError(error: unknown): APIGatewayProxyResult {
  if (error instanceof Error) {
    const displayMessage = error.name + ': ' + error.message;
    console.error(displayMessage);
    return { statusCode: 500, body: displayMessage };
  }
  return { statusCode: 500, body: '' };
}

export default handleError;
