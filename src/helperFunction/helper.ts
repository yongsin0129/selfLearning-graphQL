import { users } from '../database/users'
import { posts } from '../database/posts'
import { User } from '../generated/graphql'

// Helper Functions
export const findUserById = (id: string): User | null => {
  return users.find(user => user.id === id) || null
}
export const findPostById = (id: string) => posts.find(post => post.id === id)
export const findUserByName = (name: string) =>
  users.find(user => user.name === name)
export const filterPostsByAuthorId = (authorId: string) => {
  return posts.filter(post => post.authorId === authorId)
}
