import { Request, Response } from "express";
import connection from "../connection";
import UserService from "../Services/userService";
import bcrypt from "bcryptjs";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export default class UserController {
  constructor(private userService = new UserService()) {}

  async createUser(req: Request, res: Response) {
    try {
      // Agora desestruturando "password", não "password_hash"
      const { nameUser, fullName, email, telefone, cpf, password, role } = req.body;

      // Validações obrigatórias
      if (!nameUser || !fullName || !email || !password) {
        res.status(400).json({ message: "Please complete all required fields." });
        return;
      }

      // Sanitiza CPF (remove tudo que não for número)
      const cpfSanitized = cpf ? cpf.replace(/\D/g, '') : '';

      if (!cpfValidator.isValid(cpfSanitized)) {
        res.status(400).json({ message: "CPF inválido." });
        return;
      }

      // Validação telefone (10 ou 11 dígitos)
      const telefoneRegex = /^\d{10,11}$/;
      if (telefone && !telefoneRegex.test(telefone)) {
        res.status(400).json({ message: "Telefone inválido. Deve conter 10 ou 11 números." });
        return;
      }

      // Verifica se email ou CPF já existem
      const userAlreadyExists = await connection("users")
        .where("email", email)
        .orWhere("cpf", cpfSanitized)
        .first();

      if (userAlreadyExists) {
        res.status(409).json({ message: "Email or CPF already registered." });
        return;
      }

      // Criptografa a senha recebida
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o usuário pelo service
      await this.userService.createUser({
        nameUser,
        fullName,
        email,
        telefone,
        cpf: cpfSanitized,
        password_hash: hashedPassword, // aqui mantém o campo password_hash na DB
        role: role ?? '5', // já que no banco é ENUM string, coloque string aqui
      });

      res.status(201).json({ message: `User: ${nameUser}, registered successfully` });
      return;
    } catch (error) {
      console.error("Erro no createUser:", error);
      res.status(500).json({
        message: "Error to insert new User.",
        details: error instanceof Error ? error.message : error,
      });
      return;
    }
  }

  async listAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        message: "/// List for All Users - OTTPel |||",
        data: users,
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        details: error,
      });
      return;
    }
  }

  async listUserById(req: Request, res: Response) {
    const { userId } = req.body;
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: "User Not Found." });
        return;
      }
      res.status(200).json({
        message: `// ${user.fullName} - Informations.`,
        userInf: user,
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: "Error to Search User.",
        details: error,
      });
      return;
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.body;

    if (isNaN(userId)) {
      res.status(400).json({ error: "userId must be a valid number." });
      return;
    }
    try {
      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }

      await this.userService.deleteUser(userId);
      res.status(200).json({
        message: `${user.fullName} was deleted successfully!`,
        deleteuser: user,
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: "Error to delete user.",
        details: error,
      });
      return;
    }
  }
}
