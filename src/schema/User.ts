import { gql } from 'apollo-server'
// gql: template literal tag, 讓你在 Javascript 中使用 GraphQL 語法

const typeDefs_User = gql`
  """
  使用者
  """
  type User {
    "識別碼"
    id: ID!
    "名字"
    name: String
    "年齡"
    age: Int
    "朋友們"
    friends: [User]
    "身高 (預設為 CENTIMETRE)"
    height(unit: HeightUnit = CENTIMETRE): Float
    "體重 (預設為 KILOGRAM)"
    weight(unit: WeightUnit = KILOGRAM): Float
    "取得 Post"
    posts: [Post]
  }

  """
  高度單位
  """
  enum HeightUnit {
    "公尺"
    METRE
    "公分"
    CENTIMETRE
    "英尺 (1 英尺 = 30.48 公分)"
    FOOT
  }

  """
  重量單位
  """
  enum WeightUnit {
    "公斤"
    KILOGRAM
    "公克"
    GRAM
    "磅 (1 磅 = 0.45359237 公斤)"
    POUND
  }
`
export default typeDefs_User
