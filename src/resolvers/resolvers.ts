import { IResolvers } from '@graphql-tools/utils'
export { resolvers }
const meId = 1

// Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers: IResolvers = {
  Query: {
    hello: () => 'world',
    me: () => users[0],
    user: (root, args, context) => {
      // 取出參數。因為 name 為 non-null 故一定會有值。
      const { name } = args
      return users.find(user => user.name === name)
    },
    users: () => users
  },
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
  },
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
  },
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

// Helper Functions
const findUserById = (id: number) => users.find(user => user.id === id)
const findPostById = (id: number) => posts.find(post => post.id === id)
const findUserByName = (name: string) => users.find(user => user.name === name)
const filterPostsByAuthorId = (authorId: number) =>
  posts.filter(post => post.authorId === authorId)

// 假資料
const users = [
  {
    id: 1,
    name: 'Fong',
    email: 'fong@test.com',
    password: '123456',
    age: 25,
    friendIds: [2, 3],
    height: 175.0,
    weight: 70.0,
    birthDay: '1997-07-12'
  },
  {
    id: 2,
    name: 'Kevin',
    email: 'kevin@test.com',
    password: 'kevin123456',
    age: 40,
    height: 185.0,
    weight: 90.0,
    friendIds: [1]
  },
  {
    id: 3,
    name: 'Mary',
    email: 'Mary@test.com',
    password: 'mary123456',
    age: 18,
    height: 162,
    weight: null,
    friendIds: [1]
  }
]

const posts = [
  {
    id: 1,
    authorId: 1,
    title: 'Hello World!!',
    content: 'This is my first post. Nice to see you guys.',
    createdAt: '2018-10-15',
    likeGiverIds: [1, 3]
  },
  {
    id: 2,
    authorId: 2,
    title: 'Good Night',
    content:
      'Started earnest brother believe an exposed so. Me he believing daughters if forfeited at furniture. Age again and stuff downs spoke. Late hour new nay able fat each sell. Nor themselves age introduced frequently use unsatiable devonshire get. They why quit gay cold rose deal park. One same they four did ask busy. Reserved opinions fat him nay position. Breakfast as zealously incommode do agreeable furniture. One too nay led fanny allow plate. ',
    createdAt: '2018-10-11',
    likeGiverIds: [2, 3]
  },
  {
    id: 3,
    authorId: 3,
    title: 'Love U',
    content:
      '好濕。燕 草 如 碧 絲，秦 桑 低 綠 枝。當 君 懷 歸 日，是 妾 斷 腸 時 。春 風 不 相 識，	何 事 入 羅 幃 ？',
    createdAt: '2018-10-10',
    likeGiverIds: [1, 2]
  },
  {
    id: 4,
    authorId: 1,
    title: 'Love U Too',
    content: 'This is my first post. Nice to see you guys.',
    createdAt: '2018-10-10',
    likeGiverIds: [1, 2, 3]
  }
]
