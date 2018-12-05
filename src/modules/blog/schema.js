import { makeExecutableSchema } from 'graphql-tools';
import { postResolvers, postTypeDefs } from './types/post';

export const blogSchema = makeExecutableSchema({
  typeDefs: postTypeDefs,
  resolvers: postResolvers
});