import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import services from './services';

const schema = buildSchema(`
  type Query {
    hello: String
    shortenURL(url: String!): String
  }
`);

const root = {
  hello: () => 'Hello world!',
  shortenURL: async ({ url }, { protocol, headers: { host } }) => {
    const shortId = await services.createShortURL(url);
    return `${protocol}://${host}/${shortId}`;
  },
};

export default graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});
