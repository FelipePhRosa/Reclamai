import connection from "../connection"

interface CitiesData{
    name: string,
    mayor?: string,
    state_id: number,
    population: number,
    latitude: number,
    longitude: number,
    created_by: number
}

export default class CitiesService {
    async createCity(citiesData: CitiesData) {
        return await connection('cities').insert(citiesData);
    }

    async getCityById(cityId: Number){
        return await connection('cities').where({ id: cityId }).select('*').first();
    }

    async deleteCity(cityId: Number){
        return await connection('cities').where({ id: cityId }).delete();
    }

    async getPopulationCity(cityId: Number){
        return await connection('users').where({ city_id: cityId }).count('* as total').first();
    }
    
    async getTotalReportsByCity(cityId: Number){
        return await connection('reports').where({ city_id: cityId, status: 'aprovado'}).count('* as total').first();
    }

    async getAllReportsByCity(cityId: Number){
        return await connection('reports').where({ city_id: cityId }).select();
    }
}