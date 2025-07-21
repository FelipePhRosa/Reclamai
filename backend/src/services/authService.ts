import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import connection from "../connection";

interface LoginCredentials {
  identifier: string; // pode ser email OU nome de usuário
  password: string;
}

interface TokenPayload {
  userId: number;
  email: string;
  role: number;
}

export default class AuthService {
  private JWT_SECRET: Secret = process.env.JWT_SECRET || "chave-super-secreta";
  private JWT_EXPIRES_IN: SignOptions["expiresIn"] = "24h";

  generateToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: this.JWT_EXPIRES_IN,
    };
    return jwt.sign(payload, this.JWT_SECRET, options);
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
    } catch (error) {
      throw new Error("Invalid Token or Expired.");
    }
  }

  async login(credentials: LoginCredentials) {
    try {
      console.log("Login attempt:", credentials);

      // Normaliza o identificador: tira espaços e coloca tudo em minúsculo
      const identifierClean = credentials.identifier.trim().toLowerCase();

      const user = await connection("users")
        .whereRaw("LOWER(TRIM(email)) = ?", [identifierClean])
        .orWhereRaw("LOWER(TRIM(nameUser)) = ?", [identifierClean])
        .first();

      console.log("User found:", user);

      if (!user) {
        throw new Error("Invalid Credentials");
      }

      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.password_hash
      );

      console.log("Password valid:", isPasswordValid);

      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      }

      const token = this.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        userId: user.id,
        name: user.nameUser,
        email: user.email,
        role: user.role,
        token,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
}
