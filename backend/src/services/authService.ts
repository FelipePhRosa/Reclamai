import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import connection from "../connection";

interface LoginCredentials {
  identifier: string; 
  password: string;
}

interface SocialLoginCredentials {
  email: string;
  name: string;
  fullName: string;
  avatar: string;
  provider: 'google' | "facebook" | "github" | "apple";
  providerId: string;
}

interface TokenPayload {
  userId: number;
  email: string;
  fullName: string;
  role: number;
  avatar_url: string;
  telefone: string;
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
        fullName: user.fullName,
        role: user.role,
        avatar_url: user.avatar_url,
        telefone: user.telefone
      });

      return {
        userId: user.id,
        name: user.nameUser,
        fullName: user.fullName,
        email: user.email,
        telefone: user.telefone,
        birth_date: user.birth_date,
        cpf: user.cpf,
        role: user.role,
        avatar_url: user.avatar_url,
        token,
        is_verified: user.is_verified,
        isNewUser: false
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

async socialLogin(credentials: SocialLoginCredentials) {
    try {
      console.log("Login Attemp: ", credentials);

      if (
        !credentials ||
        !credentials.email ||
        !credentials.avatar ||
        !credentials.name ||
        !credentials.provider ||
        !credentials.providerId
      ) {
        console.log("Something is missing");
        throw new Error("Missing required fields");
      }

        const emailClear = credentials.email.trim().toLowerCase();
        const fullName = credentials.fullName;
        const nameUser = (credentials.name || "").trim().split(" ")[0] || "Usuário";
        let user = await connection("users").whereRaw("lower(trim(email)) = ?", [emailClear]).first();

        if (user) {
          if (user.provider === "local") {
            await connection("users")
              .where("id", user.id)
              .update({
                provider: credentials.provider,
                provider_id: credentials.providerId,
                nameUser: nameUser,
                fullName: fullName,
                avatar_url: credentials.avatar,
              });
            user = await connection("users").where("id", user.id).first()
            console.error(`User connection on with: ${credentials.provider}`)
          } else if (user.provider === credentials.provider) {
            console.log("Existing social user login: ", user.provider)

          } else {
            throw new Error(`Account already registered with provider '${user.provider}'. Please sign in using that provider or link accounts.`);
          }
        } else {
          const [newUserId] = await connection("users").insert({
            nameUser: nameUser,
            fullName: fullName,
            email: emailClear,
            password_hash: "",
            provider: credentials.provider,
            provider_id: credentials.providerId,
            avatar_url: credentials.avatar,
            created_at: new Date(),
            role: 5,
            birth_date: new Date(), // Usa data atual como fallback quando Google não fornece
          });

          user = await connection("users").where("id", newUserId).first();
          if (!user) {
            console.log("Error to create user: ", credentials.name)
          } else {
            console.log("Created New User: ", user);
          }
        }
      const token = this.generateToken({
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatar_url: user.avatar_url,
        telefone: user.telefone
      });

      return {
        userId: user.id,
        nameUser: user.nameUser,
        fullName: credentials.fullName,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url,
        provider: user.provider,
        token,
        is_verified: user.is_verified,   // ADICIONADO
        isNewUser: !user.created_at || (Date.now() - new Date(user.created_at).getTime()) < 5000
      };
    } catch (err) {
      console.log("Error when logging in", err)
      throw err;
    }
  }

  async verifySocialToken(provider: string, token: string): Promise<boolean> {
    try {
      switch (provider) {
        case 'google':
          const googleResponse = await fetch(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
          );
          return googleResponse.ok;
          //For now, we will only use Google Login, since we don’t have a secured domain.
          case 'facebook':
            const fbResponse = await fetch(
              `https://graph.facebook.com/me?access_token=${token}` 
            );
          return fbResponse.ok;

        default:
          return false;
      }
    } catch {
      return false;
    }
  }
}