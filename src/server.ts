import * as path from 'path'
import * as fs from 'fs'
import { ApolloServer } from 'apollo-server'

import { resolvers } from './resolvers/resolvers'

const server = new ApolloServer({
  // 用 Node.js 的 fs 和 path 模組 來讀取我們的 schema 檔案
  typeDefs: fs.readFileSync(
    path.join(__dirname, './schema/schema.graphql'),
    'utf8'
  ),
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
