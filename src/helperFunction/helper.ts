import { users } from '../database/users'
import { posts } from '../database/posts'

// Helper Functions
export const findUserById = (id: number) => users.find(user => user.id === id)
export const findPostById = (id: string) => posts.find(post => post.id === Number(id))
export const findUserByName = (name: string) => users.find(user => user.name === name)
export const filterPostsByAuthorId = (authorId: number) => {
  return posts.filter(post => post.authorId === authorId)
}
