import { ApolloServer } from 'apollo-server'
import typeDefs from './schema/schema'

import { resolvers } from './resolvers/resolvers'

const server = new ApolloServer({
  // 用 Node.js 的 fs 和 path 模組 來讀取我們的 schema 檔案
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
