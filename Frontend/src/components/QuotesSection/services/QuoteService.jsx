import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quotes';

class QuoteService {
    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // this.api.interceptors.response.use(
        //     response => response,
        //     error => {
        //         console.error('API Error:', error);
        //         return Promise.reject(this.handleError(error));
        //     }
        // );
    }

    async getAll(params = {}) {
        try {
            const response = await this.api.get('/', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const response = await this.api.get(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async create(quoteData) {
        try {
            const response = await this.api.post('/', quoteData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await this.api.delete(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async like(id) {
        try {
            const response = await this.api.patch(`/${id}/like`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // handleError(error) {
    //     if (error.response) {
    //         return {
    //             message: error.response.data.message || 'Ошибка сервера',
    //             status: error.response.status,
    //             data: error.response.data
    //         };
    //     } else if (error.request) {
    //         return {
    //             message: 'Нет ответа от сервера. Проверьте подключение.',
    //             status: 503
    //         };
    //     } else {
    //         return {
    //             message: 'Ошибка при отправке запроса: ' + error.message,
    //             status: 400
    //         };
    //     }
    // }
}

export default new QuoteService();