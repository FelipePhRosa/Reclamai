
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: number;
    avatar_url: string;
  };
}
