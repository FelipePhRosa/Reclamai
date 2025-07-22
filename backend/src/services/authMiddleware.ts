// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import AuthService from "./authService";
import connection from "../connection";
import { AuthRequest } from "../types/express";

const authService = new AuthService();
// Middleware para verificar se o usuário está autenticado
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({ error: "Invalid Token or Expired." });
      return
    }

    const token = authHeader.split(" ")[1];
    const decoded = authService.verifyToken(token);

    const user = await connection('users')
      .where({ id: decoded.userId })
      .first();

    if (!user) {
      res.status(401).json({ error: "User not found." });
      return
    }

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token or Expired." });
    return
  }
};

export const isOwner = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await connection('users')
      .where({ id: req.user?.id })
      .first();

    if (!user?.isOwner) {
      return res.status(403).json({ error: "Acess Denied: You need been Owner." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Error server to verify Owner." });
  }
};
