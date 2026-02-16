import { Request, Response } from "express";
import { connect } from "http2";
import CitiesService from "../services/citiesService";
import NeighborHoodService from "../services/neighborhoodService";
import { AuthRequest } from "../types/express";
import connection from "../connection";
import { authPlugins } from "mysql2";

export default class neighborhoodsControllers{
    constructor(
        private citiesService = new CitiesService(),
        private neighborhoodService = new NeighborHoodService()
    ){}

    async createNeighborhood(req: AuthRequest, res: Response){
        const userRole = req.user?.role
        const userId = req.user?.id

        if(!userId){
            res.status(500).json({
                message: `userID invalid.`
            });
            return;
        }

        if(!userRole || userRole > 2){
            res.status(403).json({
                message: `You don't have permission for create neighboorhood.`,
                role: userRole
            });
            return;
        }

        try{
            const { name, city_id, latitude, longitude, created_by } = req.body
            const user = req.user
            
            const city = await this.citiesService.getCityById(city_id)
            const neighborhoodAlreadyExists = await connection('neighborhoods').where({ name, city_id});

            if(!user){
                res.status(404).json({
                    error: `User not found.`
                });
                return;
            };

            if(neighborhoodAlreadyExists.length > 0){
                res.status(409).json({
                    message: `This neighborhood '${name}' already exists in ${city.name}`
                });
                return;
            };

            await this.neighborhoodService.createNeighborhood({
                name,
                city_id,
                latitude,
                longitude,
                created_by: userId
            });
            res.status(201).json({
                message: `Neighborhood created successfully. By - ${user.fullName}`
            });

            if( !name || !city_id || !latitude || !longitude || created_by ){
                res.status(400).json({
                    message: `Please complete all required fields.`
                });
                return;
            };


        } catch(error){
            res.status(500).json({
                message: `Error to create new NeighborHood.`,
                details: error
            });
            return;
        }
    }

    async getNeighborhoods(req: AuthRequest, res: Response){
        const userRole = req.user?.role
        const userId = req.user?.id

        if(!userId){
            res.status(500).json({
                message: `userID invalid.`
            });
            return;
        }

        if(!userRole || userRole > 2){
            res.status(403).json({
                message: `You don't have permission for create neighboorhood.`,
                role: userRole
            });
            return;
        }
        const { neighborhood_id, city_id } = req.body

        try{
            const user = req.user
                if(!user){
                    res.status(404).json({
                        error: `User not found.`
                    });
                    return;
                };

            const neighborhood = await this.neighborhoodService.getNeighborhoodById(neighborhood_id, city_id)
            if(!neighborhood){
                res.status(404).json({
                    message: `Neighborhood not found, verify NeighborhoodID.`
                });
                return;
            }

            if(!neighborhood_id || !city_id ){
                res.status(400).json({
                    message: `Please complete all required fields.`
                });
                return;
            }

            res.status(200).json({
                message: `/// ${neighborhood.name} - Informations.`,
                neighborhoodInf: neighborhood
            });
            return;
        } catch(error){
            res.status(500).json({
                message: `Error to Search Neighborhood.`,
                details: error,
            });
        }
    }

    async getAllNeighborhoods(req: AuthRequest, res: Response){
        const {city_id} = req.body
        const city = await this.citiesService.getCityById(city_id)
            if(!city){
                res.status(404).json({
                    message: `City Not found, please check City_Id.`
                });
                return;
            }

        try{
            const neighborhoods = await this.neighborhoodService.getAllNeighborhood(city_id)
                
                if(!neighborhoods){
                    res.status(404).json({
                        message: `${city.name} don't have neighborhoods. Verify City_ID.`
                    });
                    return;
                }

            res.status(201).json({
                message: `/// ${city.name} - Neighborhoods Informations. `,
                InfNeighborhoods: neighborhoods
            });
            return;
        } catch(error) {

        }
    }

    async delNeighborhood(req: AuthRequest, res: Response){
        const { neighborhood_id, city_id } = req.body

        try{
            const city = await this.citiesService.getCityById(city_id)
            const neighborhood = await this.neighborhoodService.getNeighborhoodById(neighborhood_id, city_id);
            if(!neighborhood){
                res.status(404).json({
                    message: `Neighborhood not found, verify NeighborhoodID.`
                });
                return;
            }

            await this.neighborhoodService.delNeighborhoodById(neighborhood_id, city_id)
            res.status(200).json({
                message: `Neighborhood ${neighborhood.name} of city ${city.name} was deleted.`
            });
            return;
        } catch(error){
            res.status(500).json({
                message: `Error to delete Neighborhood.`,
                details: error
            });
        }
    }

    
    async dashboardNeighborhood(req: AuthRequest, res: Response){
        const { city_id, neighborhood_id } = req.body   

        try{
            const city = await this.citiesService.getCityById(city_id);
            const neighboorhood = await this.neighborhoodService.getNeighborhoodById(neighborhood_id, city_id)

            const totalAccountInNeighborhood = await this.neighborhoodService.TotalAccountInNeighborhood(neighborhood_id, city_id);
            const allReportsByNeighborhood = await this.neighborhoodService.getAllReportsByNeighborhood(neighborhood_id, city_id);
            const totalReportsByNeighborhood = await this.neighborhoodService.getTotalReportsByNeighborhood(neighborhood_id, city_id);

            res.status(200).json({
                message: `Dashboard ${neighboorhood.name} - ${city.name}`,
                Details: totalAccountInNeighborhood[0],
                TotalReports: totalReportsByNeighborhood,
                allReports: allReportsByNeighborhood
            });


        } catch(error){
            res.status(500).json({
                message: `Internal Server Error (500)`
            });
        }
    }
}