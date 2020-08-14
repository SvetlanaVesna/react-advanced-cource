const { DataSource } = require("apollo-datasource");

class AuthorsAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async allAuthors() {
    return this.store.authors.findAll({ include: ["books"] });
  }

  async getAuthor(id) {
    const author = await this.store.authors.findOne({
      where: { id },
      include: ["books"]
    });
    if (author) return author;
    return null;
  }

  async addAuthor(author) {
    const newAuthor = this.store.authors.create(author);
    if (newAuthor) return newAuthor;
    return null;
  }

  async addBookToAuthor(bookId, authorId) {
    const author = await this.store.authors.findOne({
      where: { id: authorId },
      include: ["books"]
    });
    const book = await this.store.books.findOne({
      where: { id: bookId }
    });
    await author.addBooks([book]);
    return await author.save();
  }

  async deleteAuthor(authorId) {
    const author = await this.store.authors.findOne({
      where: { id: authorId },
      include: ["books"]
    });
    if (author) {
      await this.store.authors.destroy({
        where: { id: authorId }
      });
      return "ok";
    }
    return null;
  }
}

module.exports = AuthorsAPI;
