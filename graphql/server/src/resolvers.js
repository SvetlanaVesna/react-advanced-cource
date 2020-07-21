module.exports = {
    Query: {
        allBooks: async (_, {}, { dataSources }) => {
            return await dataSources.booksAPI.getAllBooks()
        },
        me: async (_, __, { dataSources }) =>
            dataSources.userAPI.findOrCreateUser(),
    },
    Mutation: {
        login: async (_, { email }, { dataSources }) => {
            const user = await dataSources.userAPI.findOrCreateUser({ email });
            if (user) return new Buffer(email).toString('base64');
        },
    },
};