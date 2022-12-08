export { resolvers }
// Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
  Query: {
    hello: () => 'world',
    me: () => users[0],
    users: () => users
  },
  // schema 中的 type User 可以為每個 Field 設定 Resolver
  User: {
    // 每個 Field Resolver 都會預設傳入三個參數，
    // 分別為上一層的資料 (即 user)、參數 (下一節會提到) 以及 context (全域變數)
    friends: (parent: any, args: any, context: any) => {
      // 從 user 資料裡提出 friendIds
      const { friendIds } = parent
      // Filter 出所有 id 出現在 friendIds 的 user
      return users.filter(user => friendIds.includes(user.id))
    }
  }
}

// 假資料
const users = [
  { id: 1, name: 'Fong', age: 23, friendIds: [2, 3] },
  { id: 2, name: 'Kevin', age: 40, friendIds: [1] },
  { id: 3, name: 'Mary', age: 18, friendIds: [1] }
]
