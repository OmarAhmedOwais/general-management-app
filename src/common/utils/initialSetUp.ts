import { UserRole } from "../../data/types";
import { Password } from "./password";
import { UserService } from "../../user/user.service";

const createAdmin = async () => {
  const userService = new UserService();
  try {
    const user = await userService.findOne({ email: "rootadmin@gmail.com" });
    if (!user) {
      await userService.create({
        email: "rootadmin@gmail.com",
        password: Password.hash("123123123"),
        role: UserRole.ADMIN,
      });

      console.log("Admin User Created!");
    }
  } catch (err) {
    console.log(err);
  }
};

export { createAdmin };
