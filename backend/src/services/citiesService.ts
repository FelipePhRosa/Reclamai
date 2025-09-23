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
        return await connection('cities').where({ id: cityId }).delete()
    }
}