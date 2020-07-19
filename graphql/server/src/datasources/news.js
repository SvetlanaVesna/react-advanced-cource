
const { RESTDataSource } = require('apollo-datasource-rest');

class NewsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://newsapi.org/v2/top-headlines';
    }

    async getAllNews() {
        const response = await this.get('', {country: 'ru',apiKey: 'b77e32c575c847a7a4b41160f463cc77' });
        return response.status === 'ok' ? response: null;
    }

    async getNewsByMention({ mention }) {
        return await this.get('', {q: mention, country: 'ru',apiKey: 'b77e32c575c847a7a4b41160f463cc77'});
    }

    async getNewsByTitle({ title }) {
        return await this.get('', {qInTitle: title});
    }
}

module.exports = NewsAPI;