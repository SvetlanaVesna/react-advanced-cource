const { ApolloServer } = require("apollo-server");
const isEmail = require("isemail");

const typeDefs = require("./schema");

const resolvers = require("./resolvers");
const { createStore } = require("./utils");

const BooksAPI = require("./datasources/books");
const AuthorsAPI = require("./datasources/authors");
const UserAPI = require("./datasources/user");

// creates a sequelize connection once. NOT for every request
const store = createStore();
// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || "";
  const email = new Buffer(auth, "base64").toString("ascii");

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  engine: {
    reportSchema: true
  },
  dataSources: () => ({
    booksAPI: new BooksAPI({ store }),
    authorsAPI: new AuthorsAPI({ store }),
    userAPI: new UserAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
