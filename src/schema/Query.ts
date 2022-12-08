import { gql } from 'apollo-server'
// gql: template literal tag, 讓你在 Javascript 中使用 GraphQL 語法

// GraphQL Schema 定義
const typeDefs_Query = gql`
  # Query 定義
  type Query {
    "A simple type for getting started!"
    hello: String
    "取得當下使用者"
    me: User
    "取得所有使用者"
    users: [User]
    "取得特定 user (name 為必填)"
    user(name: String!): User
  } 
`
export default typeDefs_Query

