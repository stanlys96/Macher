const { ApolloServer, gql } = require('apollo-server');
const UserSchema = require('./schema/user');

const typeDefs = gql`
  type Query

  type Mutation
`;

const resolvers = {
  Query: {
  },
  Mutation: {
  }
}

const server = new ApolloServer({
  typeDefs: [typeDefs, UserSchema.typeDefs],
  resolvers: [resolvers, UserSchema.resolvers]
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
})