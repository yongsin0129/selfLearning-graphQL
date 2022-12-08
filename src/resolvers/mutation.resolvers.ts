import { IResolvers } from '@graphql-tools/utils'
import { users } from '../database/users'
import { posts } from '../database/posts'
import {
  filterPostsByAuthorId,
  findPostById,
  findUserById,
  findUserByName
} from '../helperFunction/helper'
const meId = 1

export { mutation_resolvers }
const mutation_resolvers: IResolvers = {
  Mutation: {
    // 需注意！args 打開後第一層為 input ，再進去一層才是 title, content
    addPost: (root, args, context) => {
      const {
        input: { title, content }
      } = args
      // 新增 post
      posts.push({
        id: posts.length + 1,
        authorId: meId,
        title,
        content,
        likeGiverIds: [],
        createdAt: Date()
      })
      // 回傳新增的那篇 post
      return posts[posts.length - 1]
    },
    likePost: (root, args, context) => {
      const { postId } = args
      const post = findPostById(postId)
      if (!post) throw new Error(`Post id : ${postId} Not Exists`)

      if (post.likeGiverIds.includes(meId)) {
        // 如果已經按過讚就收回
        const index = post.likeGiverIds.findIndex(v => v === meId)
        post.likeGiverIds.splice(index, 1)
      } else {
        // 否則就加入 likeGiverIds 名單
        post.likeGiverIds.push(meId)
      }
      return post
    }
  }
}
