import { Request, Response } from "express";
import AuthService from "../services/authService";

export default class AuthController {
  constructor(private authService = new AuthService()) {}

  async login(req: Request, res: Response) {
    console.log("Login Request Body:", req.body);
    const { identifier, password } = req.body;

    try {
      const loginResult = await this.authService.login({ identifier, password });
      // loginResult = { userId, name, email, role, token }
      
      res.status(200).json(loginResult);  // envia tudo para o frontend
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
}