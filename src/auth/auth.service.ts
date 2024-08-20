import {
  generateToken,
  GenerateTokenPayload,
  logger,
  Password,
} from "@/common/utils";
import { AppDataSource } from "../common/config/data-source";
import { User } from "../data/entities/User";
import { BadRequestError } from "@/common/errors";
import { MessageType } from "@/data";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(email: string, password: string): Promise<User> {
    try {
      const hashedPassword = Password.hash(password);
      const user = this.userRepository.create({
        email,
        password: hashedPassword,
      });
      // Generate a token for the new user
      const token = generateToken({
        id: user.id?.toString(),
      } as GenerateTokenPayload);

      return await this.userRepository.save(user);
    } catch (error) {
      // Log the error details for debugging
      logger.error("Error in registerUser:", error);

      throw new BadRequestError([
        { message_en: "Error Registering The User", type: MessageType.ERROR },
      ]);
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !Password.compare(password, user.password)) {
      throw new BadRequestError([
        {
          message_en: "Invalid email Number or Password",
          type: MessageType.ERROR,
        },
      ]);
    }
    const token = generateToken({
      id: user.id?.toString(),
    } as GenerateTokenPayload);
    return { user, token };
  }
}
