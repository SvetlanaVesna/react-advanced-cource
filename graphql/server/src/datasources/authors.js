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

  async addAuthor(author) {
    await this.store.authors.sync({ force: true });
    console.log("The table for the Author model was just (re)created!");
    const newAuthor = this.store.authors.create(author);
    if (newAuthor) return newAuthor;
    return null;
  }
}

module.exports = AuthorsAPI;
