import { gql } from 'apollo-server'
// gql: template literal tag, 讓你在 Javascript 中使用 GraphQL 語法

const typeDefs_Mutation = gql`
  # Mutation 定義
  type Mutation {
    "新增貼文"
    addPost(input: AddPostInput!): Post
    "貼文按讚 (收回讚)"
    likePost(postId: ID!): Post
  }
`
export default typeDefs_Mutation

