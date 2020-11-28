import { APIGatewayProxyEvent, Context } from 'aws-lambda';

// Warning: context includes properties and methods specific to Netlify
// such as Netlify Identity
exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
  return {
    statusCode: 200,
    body: 'Hello World!',
  };
};
