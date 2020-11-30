import axios, { AxiosResponse } from 'axios';

interface Variables {
  [key: string]: string;
}

interface FaunaErrorLocation {
  line: number;
  column: number;
}

interface FaunaErrors {
  message: string;
  locations: FaunaErrorLocation[];
}

interface FaunaResponse {
  data: unknown;
  errors: FaunaErrors;
}

const ok = (httpStatus: number) => httpStatus >= 200 && httpStatus < 300;

async function sendQuery(
  query: string,
  variables: Variables = {}
): Promise<unknown> {
  const {
    status,
    data: { data, errors },
  }: AxiosResponse<FaunaResponse> = await axios({
    url: 'https://graphql.fauna.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      // https://docs.fauna.com/fauna/current/api/graphql/previews/partial_update_mutation
      'X-Schema-Preview': 'partial-update-mutation',
    },
    data: {
      query,
      variables: variables,
    },
  });
  if (!ok(status)) throw Error('HTTP Status Code is not OK');
  if (errors) {
    console.error(errors);
    throw Error('An error happened while processing the request');
  }
  return data;
}

export default sendQuery;
