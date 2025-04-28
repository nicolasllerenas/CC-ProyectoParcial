// services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(
    nombre: string,
    email: string,
    password: string
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) throw new Error("Email ya registrado");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      nombre,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }
    return jwt.sign(
      { userId: user.id, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }
}
