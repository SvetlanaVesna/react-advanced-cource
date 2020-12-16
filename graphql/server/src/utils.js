const { Sequelize, DataTypes } = require("sequelize");

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "./store.sqlite"
  });

  const users = db.define("users", {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    email: DataTypes.STRING,
    token: DataTypes.STRING
  });
  const books = db.define("books", {
    description: DataTypes.STRING,
    pubDate: DataTypes.DATE,
    title: DataTypes.STRING
  });
  const authors = db.define("authors", {
    bio: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    middlename: DataTypes.STRING
  });
  const comments = db.define("comments", {
    author: DataTypes.STRING,
    pubDate: DataTypes.DATE,
    text: DataTypes.STRING
  });

  authors.hasMany(books, { as: "books" });
  books.belongsTo(authors);

  books.hasMany(comments, { as: "comments" });
  comments.belongsTo(books, { foreignKey: "bookId" });

  return { db, users, books, authors, comments };
};
