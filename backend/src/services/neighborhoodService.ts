import connection from "../connection";

interface neighborhoodData{
    name: string,
    city_id: number,
    latitude: number,
    longitude: number,
    created_by: number
}

export default class NeighborHoodService {
    async createNeighborhood(neighborhoodData: neighborhoodData){
        return await connection('neighborhoods').insert(neighborhoodData)
    };
    
    async getNeighborhoodById(neighborhood_id: Number, city_id: Number){
        return await connection('neighborhoods').where({ id: neighborhood_id, city_id: city_id}).select('*').first();
    }

    async getAllNeighborhood(city_id: Number){
        return await connection('neighborhoods').where({ city_id: city_id }).select('*')
    }

    async delNeighborhoodById(neighborhood_id: Number, city_id: Number){
        return await connection('neighborhoods').where({ id: neighborhood_id, city_id: city_id }).delete();
    }
}