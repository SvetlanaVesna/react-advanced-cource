const { PubSub } = require("apollo-server");
const pubsub = new PubSub();
const AUTHOR_ADDED = "AUTHOR_ADDED";

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
    editBook: async (_, { bookId, book }, { dataSources }) => {
      return await dataSources.booksAPI.editBook(bookId, book);
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
      return await dataSources.authorsAPI.deleteAuthor(authorId);
    },
    addComment: async (_, params, { dataSources }) => {
      const newBook = await dataSources.booksAPI.addComment(params);
      if (newBook) return newBook;
    }
  },
  Subscription: {
    authorAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([AUTHOR_ADDED])
    }
  }
};
