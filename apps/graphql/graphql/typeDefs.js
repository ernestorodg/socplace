const { gql } = require('apollo-server');



module.exports = gql`
  type Post {
    _id: ID!
    description: String!
    title: String!
    seller: String!
    comments: [Comment]!
    commentCount: Int!
    price: String!
    category: String!
    image: String
    latitude: Float
    longitude: Float
  }
  type Comment {
    id: Int!
    createdAt: String!
    username: String!
    body: String!
  }
  type SavedProduct {
    id: ID!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    savedProducts: [SavedProduct]
    latitude: Float
    longitude: Float
    image: String
  }
  type UserData {
    id: ID!
    username: String!
    latitude: Float
    longitude: Float
    image: String
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    latitude: Float
    longitude: Float
    image: String
  }
  type Query {
    getUsers: [User]
    getProducts: [Post]
    getProduct(productId: ID!): Post
    filterProduct(
      title: String,
      description: String,
      seller: String,
      price: String,
      image: String,
      latitude: Float,
      longitude: Float,
      ): [Post]
    lookForProductByTitle(
      title: String,
      ): [Post]
    getUserData(username: String!): UserData
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    saveProduct(productId: ID!): [SavedProduct]!
    login(username: String!, password: String!): User!
    createProduct(
      title: String!,
      description: String!,
      category: String!,
      price: String!,
      image: String,
      ): Post!
    deleteProduct(productId: ID!): String!
    createComment(productId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    getUserSavedProducts: [SavedProduct]

  }
  type Subscription {
    newPost: Post!
  }
`;
