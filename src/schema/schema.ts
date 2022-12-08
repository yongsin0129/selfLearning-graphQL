import { gql } from 'apollo-server'
// gql: template literal tag, 讓你在 Javascript 中使用 GraphQL 語法


// GraphQL Schema 定義
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`
export default typeDefs
