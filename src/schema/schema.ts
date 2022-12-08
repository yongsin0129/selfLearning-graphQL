import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    users: [User]
    user(userInput: UserId): User
  }

  type Mutation {
    createUser(userInput: UserInput): User
    updateUser(userInput: UserInput): User
    deleteUser(userId: UserId): User
  }

  type User {
    id: Int
    name: String
    age: Int
  }

  input UserInput {
    id: Int
    name: String
    age: Int
  }

  input UserId {
    id: Int
  }
`
export default typeDefs
