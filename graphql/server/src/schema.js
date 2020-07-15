const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date
  type User {
      id: ID!
      email: String!
      login: String!
  }
  type Post {
      id: ID!
      datetime: Date
      author: User!
      comments: [Comment]
      text: String!
  }
  type Comment {
      id: ID!
      datetime: Date
      author: User!
      text: String!
  }
  
  type NewPostResponse {
      success: Boolean!
      message: String
      posts: [Post]
  }
  type NewCommentResponse {
      success: Boolean!
      message: String
      comments: [Comment]
  }  
  
  type Query {
      getPosts: [Post]
      getPost(id: ID!): Post
      me: User
  }
  
  type Mutation {
      newPost(text: String!): NewPostResponse!
      newComment(text: String!): NewCommentResponse!
      login(email: String): String # login token
}
`;

module.exports = typeDefs;