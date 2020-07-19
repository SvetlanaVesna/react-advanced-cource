module.exports = {
    Query: {
        news: async (_, {}, { dataSources }) => {
            return await dataSources.newsAPI.getAllNews()
        },
        newsByMention: (_, { mention }, { dataSources }) =>
            dataSources.newsAPI.getNewsByMention({ mention: mention }),
        me: async (_, __, { dataSources }) =>
            dataSources.userAPI.findOrCreateUser(),
    },
    Mutation: {
        likeNews: async (_, { title }, { dataSources }) => {
            const results = await dataSources.userAPI.likeNews({ title });
            const news = await dataSources.userAPI.getFavoriteNews();

            return {
                success: results,
                message: 'news  added to favorite '
                ,
                news,
            };
        },
        login: async (_, { email }, { dataSources }) => {
            const user = await dataSources.userAPI.findOrCreateUser({ email });
            if (user) return new Buffer(email).toString('base64');
        },
    },
    User: {
        news: async (_, __, { dataSources }) => {
            const news = await dataSources.userAPI.getFavoriteNews();

            if (!news.length) return [];

            return news
        },
    },
};