import { Request, Response } from "express";
import connection from "../connection";
import CitiesService from "../services/citiesService";
import { AuthRequest } from "../types/express";

export default class citiesControllers{
    constructor(private citiesService = new CitiesService()){}
    
    async createCity (req: AuthRequest, res: Response){
        const userRole = req.user?.role
        const userId = req.user?.id

        if(!userId){
            res.status(500).json({
                message: `userId invalid.`
            })
            return;
        }

        if (!userRole || userRole > 2){
            res.status(403).json({
                message: `You don't have permission for create city.`,
                role: userRole
            });
            return;
        }

        try{
            const { name, state_id, population, latitude, longitude, created_by } = req.body
            const user = req.user

            const cityAlreadyExists = await connection('cities').where({ name })

            if (cityAlreadyExists.length > 0){
                res.status(409).json({
                    message: `City Already Exists.`
                });
                return;
            }

            if(!name || !state_id || !population || !latitude || !longitude || !created_by){
                res.status(400).json({
                    message: `Please complete all required fields.`
                });
                return;
            }

            if(!user){
                res.status(404).json({
                    error: `User not found.`
                });
                return;
            }

            await this.citiesService.createCity({
                name,
                state_id,
                population,
                latitude,
                longitude,
                created_by: userId
            })
            res.status(201).json({
                message: `City created successfully. By - ${user.fullName}`
            });
            
        } catch (error){
            res.status(500).json({
                message: `Error to Create City.`,
                details: error
            });
            return;
        }
    }

    async getCityById(req: AuthRequest, res: Response){
        const { cityId } = req.body

        try{
            const city = await this.citiesService.getCityById(cityId)
            if(!city){
                res.status(404).json({
                    message: `City Not Found, verify CityID. `
                });
                return;
            }

            res.status(200).json({
                message: `// ${city.name} - Informations. `,
                cityInf: city
            });
            return;
        } catch (error){
            res.status(500).json({
                message: `Error to Search City.`,
                details: error
            });
            return;
        }

    }

    async deleteCity(req: AuthRequest, res: Response): Promise<void> {
    const user = req.user;

    if (!user) {
        res.status(401).json({ message: "Token Invalid - Try sign-in again." });
        return;
    }

    const userId = Number(user.id);
    const userRole = Number(user.role);

    if (isNaN(userId)) {
        res.status(400).json({ error: "UserId must be a valid number." });
        return;
    }

    if (!userRole || userRole > 2) {
        res.status(403).json({ error: "You don't have permission to delete city." });
        return;
    }

    const cityId = Number(req.body.cityId);
    if (isNaN(cityId)) {
        res.status(400).json({ error: "CityId must be a valid number." });
        return;
    }

    try {
        const city = await this.citiesService.getCityById(cityId);
        if (!city) {
            res.status(404).json({ message: "City not found." });
            return;
        }

        const usersInCity = await connection('users')
            .select('id', 'fullName', 'email', 'role')
            .where({ city_id: cityId });

        if (usersInCity.length > 0) {
            res.status(400).json({
                message: "Cannot delete city: there are users assigned to this city.",
                users: usersInCity
            });
            return;
        }

        await this.citiesService.deleteCity(cityId);

        res.status(200).json({
            message: `${city.name} was deleted successfully`,
            deletecity: city
        });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error to delete city.",
            details: error
        });
        return;
    }
}

}