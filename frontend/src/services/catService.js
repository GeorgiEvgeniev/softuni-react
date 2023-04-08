import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/cats';

export const catServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const cats = Object.values(result).filter((r) => !['CoverFire', 'MineCraft', 'Zombie Lang'].includes(r.title));
    
        return cats;
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

    const edit = (catId, data) => request.put(`${baseUrl}/${catId}`, data);

    const deleteCat = (catId) => {
        request.delete(`${baseUrl}/${catId}`);
    }

    return {
        getAll,
        getOne,
        create,
        edit,
        delete: deleteCat,
    };
}