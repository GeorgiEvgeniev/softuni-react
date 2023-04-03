import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/games';

export const gameServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const games = Object.values(result);
    
        return games;
    };
    
    const getOne = async (catId) => {
        const result = await request.get(`${baseUrl}/${catId}`);
    
        return result;
    };
    
    const create = async (catData) => {
        const result = await request.post(baseUrl, catData);
    
        console.log(result);
    
        return result;
    };
    
    const addComment = async (gameId, data) => {
        const result = await request.post(`${baseUrl}/${gameId}/comments`, data);
    
        return result;
    };

    const edit = (catId, data) => request.put(`${baseUrl}/${catId}`, data);

    const deleteGame = (catId) => request.delete(`${baseUrl}/${catId}`);


    return {
        getAll,
        getOne,
        create,
        edit,
        addComment,
        delete: deleteGame,
    };
}