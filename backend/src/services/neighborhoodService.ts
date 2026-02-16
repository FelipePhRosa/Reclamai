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

    async getAllInfoNeighborhood(neighborhood_id: Number, city_id: Number){
        return await connection('neighborhoods').where({ id: neighborhood_id, city_id: city_id }).select('*')
    }
    async delNeighborhoodById(neighborhood_id: Number, city_id: Number){
        return await connection('neighborhoods').where({ id: neighborhood_id, city_id: city_id }).delete();
    }

    async TotalAccountInNeighborhood(neighborhood_id: Number, city_id: Number){
        return await connection('users').where({ neighborhood_id, city_id }).count('* as totalAccounts');
    }

    async getAllAccountsInNeighborhood(neighborhood_id: Number, city_id: Number){
        return await connection('users').where({ neighborhood_id, city_id }).select('*');
    }

    async getAllReportsByNeighborhood(neighborhood_id: Number, city_id: Number){
        return await connection('reports').where({ neighborhood_id, city_id }).orderBy('created_at', 'desc');
    }

    async getTotalReportsByNeighborhood(neighborhood_id: Number, city_id: Number){
        return await connection('reports').where({ neighborhood_id: neighborhood_id, city_id: city_id }).count('* as totalReport');
    }
}