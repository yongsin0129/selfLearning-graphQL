export { resolvers }
// Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
  Query: {
    hello: () => 'world',
    // 3. 加上 me 的 resolver (一定要在 Query 中喔)
    me: () => users[0]
  }
}

// 假資料
const users = [
  {
    id: 1,
    name: 'Fong',
    age: 23
  },
  {
    id: 2,
    name: 'Kevin',
    age: 40
  },
  {
    id: 3,
    name: 'Mary',
    age: 18
  }
]
