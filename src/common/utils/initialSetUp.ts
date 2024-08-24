import { UserRole } from "../../data/types";
import { Password } from "./password";
import { UserService } from "../../modules/user/user.service";

const createAdmin = async () => {
  const userService = new UserService();
  try {
    // Find if the admin user already exists
    const user = await userService.findOne({ email: "rootadmin@gmail.com" });

    if (!user) {
      // Create the admin user if it does not exist
      await userService.create({
        email: "rootadmin@gmail.com",
        password: Password.hash("123123123"),
        role: UserRole.ADMIN,
      });

      console.log("Admin User Created!");
    } else {
      console.log("Admin User already exists!");
    }
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
};

export { createAdmin };
