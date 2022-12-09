import { gql } from 'apollo-server'
// gql: template literal tag, 讓你在 Javascript 中使用 GraphQL 語法

const typeDefs_Post = gql`
  """
  貼文
  """
  type Post {
    "識別碼"
    id: ID!
    "作者"
    author: User
    "作者Id"
    authorId: String
    "標題"
    title: String
    "內容"
    content: String
    "按讚者"
    likeGivers: [User]
    "按讚者Id"
    likeGiverIds: [String]
  }

  """
  addPost() input type
  """
  input AddPostInput {
    title: String!
    content: String
  }
`
export default typeDefs_Post
