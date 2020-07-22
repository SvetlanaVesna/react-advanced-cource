const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date
  type User {
      id: ID!
      email: String!
      login: String!
  }
  type Author {
    bio: String!
    books: [Book!]
    firstname: String!
    id: ID!
    lastname: String!
    middlename: String!
  }
  
  type Book {
    authors: [Author!]
    comments: [Comment!]
    description: String!
    id: ID!
    pubDate: Date
    title: String!
  }

 type BookFilter {
    id: ID
 }
 type CommentFilter {
    book: BookFilter
 }
  type Query {
    allAuthors: [Author!]!
    allBooks: [Book!]!
    getAuthor(id: ID!): Author
    getBook(id: ID!): Book
    me: User
  }
  type Mutation {
    login(email: String): String # login token
  }
`;

module.exports = typeDefs;