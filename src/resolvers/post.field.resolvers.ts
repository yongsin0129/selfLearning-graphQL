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

export { post_field_resolvers }
// Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const post_field_resolvers: IResolvers = {
  Post: {
    // 2-1. parent 為 post 的資料，透過 post.likeGiverIds 連接到 users
    likeGivers: (parent, args, context) => {
      return parent.likeGiverIds.map((id: number) => findUserById(id))
    },
    // 2-2. parent 為 post 的資料，透過 post.author
    author: (parent, args, context) => {
      return findUserById(parent.authorId)
    }
  }
}
