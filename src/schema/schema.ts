import { gql } from 'apollo-server'
// gql: template literal tag, 讓你在 Javascript 中使用 GraphQL 語法

// GraphQL Schema 定義
const typeDefs = gql`
  """
  使用者
  """
  type User {
    "識別碼"
    id: ID!
    "名字"
    name: String
    "年齡"
    age: Int
    "朋友們"
    friends: [User]
  }

  type Query {
    "A simple type for getting started!"
    hello: String
    "取得當下使用者"
    me: User
    "取得所有使用者"
    users: [User]
  }
`
export default typeDefs
