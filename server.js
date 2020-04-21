import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Post, User } from './models';

dotenv.config({ path: 'variables.env' });

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch(console.error);

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`;

const server = new ApolloServer({ typeDefs, context: { User, Post } });

server.listen().then(({ url }) => {
  console.log(`Server is listening on port ${url}`);
});
