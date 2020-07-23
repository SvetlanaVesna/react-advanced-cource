module.exports = {
  Query: {
    allBooks: async (_, {}, { dataSources }) => {
      return await dataSources.booksAPI.getAllBooks();
    },
    me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return new Buffer(email).toString("base64");
    },
    addAuthor: async (_, { author }, { dataSources }) => {
      const newAuthor = await dataSources.authorsAPI.addAuthor(author);
      if (newAuthor) return newAuthor;
    }
  }
};
