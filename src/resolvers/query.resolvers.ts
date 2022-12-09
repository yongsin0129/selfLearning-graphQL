import * as Type from '../generated/graphql'
import { users } from '../database/users'
import { posts } from '../database/posts'

export { query_resolvers }
const meId = "1"

const query_resolvers: Type.QueryResolvers = {
  hello: () => 'world',
  me: () => users[0],
  user: (root, args, context) => {
    // 取出參數。因為 name 為 non-null 故一定會有值。
    const { name } = args
    return users.find(user => user.name === name) || null
  },
  users: () => users
}
