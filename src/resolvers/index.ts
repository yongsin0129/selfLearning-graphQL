import { query_resolvers } from './query.resolvers'
import { mutation_resolvers } from './mutation.resolvers'
import { user_field_resolvers } from './user.field.resolvers'
import { post_field_resolvers } from './post.field.resolvers'

export const resolvers = {
  Query: query_resolvers,
  Mutation: mutation_resolvers,
  User: user_field_resolvers,
  Post: post_field_resolvers
}
