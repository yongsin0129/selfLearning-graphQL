import { gql } from 'apollo-server'
// gql: template literal tag, 讓你在 Javascript 中使用 GraphQL 語法

// GraphQL Schema 定義
const typeDefs = gql`
  """
  使用者資訊
  """
  type User {
    "識別碼"
    id: ID
    "名字"
    name: String
    "年齡"
    age: Int
  }

  type Query {
    "A simple type for getting started!"
    hello: String
    "取得當下使用者"
    me: User
  }
`
export default typeDefs
