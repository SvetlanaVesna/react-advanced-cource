const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date
  type User {
      id: ID!
      email: String!
      login: String!
      news: [News]
  }
  type NewsSource {
   id: ID
   name: String
  }
  
  type News {
      source: NewsSource!
      author: String
      title: String
      description: String
      url: String
      urlToImage: String
      publishedAt: String
      content: String
  }

   type NewsUpdateResponse {
    success: Boolean!
    message: String
    news: [News]
  }
  
  type NewsResponse {
        status: String
        totalResults: Int
        articles: [News]
  }
  type Query {
    news:  NewsResponse
    newsByMention(mention: String!):  NewsResponse
    me: User
    isFavorite: Boolean
  }
  type Mutation {
    likeNews(title: String!): NewsUpdateResponse!
    login(email: String): String # login token
  }
  
`;

module.exports = typeDefs;