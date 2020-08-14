module.exports = {
  Query: {
    allBooks: async (_, {}, { dataSources }) => {
      return await dataSources.booksAPI.getAllBooks();
    },
    allAuthors: async (_, {}, { dataSources }) => {
      return await dataSources.authorsAPI.allAuthors();
    },
    getAuthor: async (_, { id }, { dataSources }) => {
      return await dataSources.authorsAPI.getAuthor(id);
    },
    getBook: async (_, { id }, { dataSources }) => {
      return await dataSources.booksAPI.getBook(id);
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
    },
    addBook: async (_, { book }, { dataSources }) => {
      const newBook = await dataSources.booksAPI.addBook(book);
      if (newBook) return newBook;
    },
    addBookToAuthor: async (_, { bookId, authorId }, { dataSources }) => {
      const author = await dataSources.authorsAPI.addBookToAuthor(
        bookId,
        authorId
      );
      if (author) return author;
      return null;
    },
    deleteAuthor: async (_, { authorId }, { dataSources }) => {
      return await dataSources.authorsAPI.deleteAuthor(authorId)
    },
    addComment: async (_, params, { dataSources }) => {
      const newBook = await dataSources.booksAPI.addComment(params);
      if (newBook) return newBook;
    }
  }
};
