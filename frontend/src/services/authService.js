import { requestFactory } from './requester';

const baseUrl = `http://localhost:3030`;

export const authServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        login: (data) => request.post(`${baseUrl}/users/login`, data),
        register: (data) => request.post(`${baseUrl}/users/register`, data),
        logout: () => request.get(`${baseUrl}/users/logout`),
    }
};