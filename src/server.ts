if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
import { ApolloServer } from '@apollo/server'
// ApolloServer: 讓我們啟動 server 的 class ，不但實作許多 GraphQL 功能也提供 web application 的功能 (背後使用 express)
import { startStandaloneServer } from '@apollo/server/standalone'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'

import typeDefs from './schema'
import { resolvers } from './resolvers'

interface MyContext {
  token?: String
}

const port = Number(process.env.PORT) || 4000
process.env.NODE_ENV = 'production'

// 初始化 Web Server ，需傳入 typeDefs (Schema) 與 resolvers (Resolver)
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  persistedQueries: false,
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: process.env.APOLLO_GRAPH_REF,
          footer: false,
          // embed: true          
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false })
  ]
})
const boost = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: port }
  })
  console.log(`🚀  Server ready at ${url}`)
}

boost()
