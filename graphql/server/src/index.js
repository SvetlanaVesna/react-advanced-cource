const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");

const resolvers = require("./resolvers");
const { createStore } = require("./utils");

const BooksAPI = require("./datasources/books");
const AuthorsAPI = require("./datasources/authors");
const UserAPI = require("./datasources/user");

// creates a sequelize connection once. NOT for every request
const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    booksAPI: new BooksAPI({ store }),
    authorsAPI: new AuthorsAPI({ store }),
    userAPI: new UserAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
