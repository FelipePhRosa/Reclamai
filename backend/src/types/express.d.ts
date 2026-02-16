
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    fullName: string;
    role: number;
    avatar_url: string;
    telefone: string;
    city_id: number;
    neighborhood_id: number;
  };
}
