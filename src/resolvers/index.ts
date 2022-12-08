import { query_resolvers } from './query.resolvers'
import { mutation_resolvers } from './mutation.resolvers'
import { user_field_resolvers } from './user.field.resolvers'
import { post_field_resolvers } from './post.field.resolvers'

export const resolvers = {
  ...query_resolvers,
  ...mutation_resolvers,
  ...user_field_resolvers,
  ...post_field_resolvers
}
