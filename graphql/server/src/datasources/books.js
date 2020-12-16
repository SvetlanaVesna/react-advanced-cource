const { DataSource } = require("apollo-datasource");
const uuidv4 = require("uuid/v4");

class BooksAPI extends DataSource {
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

  async getAllBooks() {
    return this.store.books.findAll({ include: "author" });
  }

  async getBook(id) {
    return this.store.books.findOne({
      where: { id }
    });
  }

  async editBook(id, bookToEdit) {
    return await this.store.books.update(
      {
        authorId: bookToEdit.authorId
      },
      {
        where: { id }
      }
    );
  }

  async addBook(book) {
    const newBook = this.store.books.create(book);
    if (newBook) return newBook;
    return null;
  }
  async addComment(params) {
    const book = await this.store.books.findOne({
      where: { id: params.id }
    });
    const newComment = this.store.comments.create({
      author: params.author,
      pubDate: params.pubDate,
      text: params.text
    });

    await book.addComments([newComment]);
    return await book.save();
  }
}

module.exports = BooksAPI;
