import fs from 'fs';
import path from 'path';

import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Post, User } from './models';
import { resolvers } from './resolvers';

const filePath = path.join(__dirname, 'typedefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');

dotenv.config({ path: 'variables.env' });

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch(console.error);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { User, Post },
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on port ${url}`);
});
