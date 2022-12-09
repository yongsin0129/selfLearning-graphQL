import { ApolloServer } from 'apollo-server'
// ApolloServer: 讓我們啟動 server 的 class ，不但實作許多 GraphQL 功能也提供 web application 的功能 (背後使用 express)

import typeDefs from './schema'
import { resolvers } from './resolvers'

// 初始化 Web Server ，需傳入 typeDefs (Schema) 與 resolvers (Resolver)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: 'bounded'
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
