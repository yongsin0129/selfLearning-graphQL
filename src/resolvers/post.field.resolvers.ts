import * as Type from '../generated/graphql'
import { users } from '../database/users'
import { posts } from '../database/posts'
import {
  filterPostsByAuthorId,
  findPostById,
  findUserById,
  findUserByName
} from '../helperFunction/helper'
const meId = '1'

// Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
export const post_field_resolvers: Type.PostResolvers = {
  // 2-1. parent 為 post 的資料，透過 post.likeGiverIds 連接到 users
  likeGivers: (parent, args, context) => {
    if(!parent.likeGiverIds) return []
    const likeGivers:Type.User[] = []
    parent.likeGiverIds.forEach((id)=>{
      if(typeof id !== 'string') return
      const likeGiver = findUserById(id)
      if(likeGiver) likeGivers.push(likeGiver)
    })
    return likeGivers
  },
  // 2-2. parent 為 post 的資料，透過 post.author
  author: (parent, args, context) => {
    return findUserById(parent.authorId!)
  }
}
