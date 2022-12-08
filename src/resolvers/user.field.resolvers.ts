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

export { user_field_resolvers }
// Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const user_field_resolvers: IResolvers = {
  // schema 中的 type User 可以為每個 Field 設定 Resolver
  User: {
    // 每個 Field Resolver 都會預設傳入三個參數，
    // 分別為上一層的資料 (即 user)、參數 (下一節會提到) 以及 context (全域變數)
    friends: (parent, args, context) => {
      // 從 user 資料裡提出 friendIds
      const { friendIds } = parent
      // Filter 出所有 id 出現在 friendIds 的 user
      return users.filter(user => friendIds.includes(user.id))
    },
    // 對應到 Schema 的 User.height
    height: (parent, args) => {
      const { unit } = args
      // 可注意到 Enum type 進到 javascript 就變成了 String 格式
      // 另外支援 default 值 CENTIMETRE
      if (!unit || unit === 'CENTIMETRE') return parent.height
      else if (unit === 'METRE') return parent.height / 100
      else if (unit === 'FOOT') return parent.height / 30.48
      throw new Error(`Height unit "${unit}" not supported.`)
    },
    // 對應到 Schema 的 User.weight
    weight: (parent, args, context) => {
      const { unit } = args
      // 支援 default 值 KILOGRAM
      if (!unit || unit === 'KILOGRAM') return parent.weight
      else if (unit === 'GRAM') return parent.weight * 100
      else if (unit === 'POUND') return parent.weight / 0.45359237
      throw new Error(`Weight unit "${unit}" not supported.`)
    },
    // User.parent field resolver, 回傳屬於該 user 的 posts
    posts: (parent, args, context) => {
      // parent.id 為 userId
      return filterPostsByAuthorId(parent.id)
    }
  }
}
