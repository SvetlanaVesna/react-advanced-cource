const { gql } = require("apollo-server");

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
    description: String!
    id: ID!
    pubDate: Date
    title: String!
  }

  type BookFilter {
    id: ID
  }

  input NewAuthorInput {
    bio: String!
    firstname: String!
    lastname: String!
    middlename: String!
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
    addAuthor(author: NewAuthorInput): Author!
  }
`;

module.exports = typeDefs;
