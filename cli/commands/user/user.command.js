import { userModel } from "../../../database/models/user.model.js";
import { seedUsers } from "./user.service.js";

export default function registerUserCommand(program) {
  program
    .command("seed-users <count>")
    .option("--reset", "Delete old users first")
    .description("Generate admin and random users")
    .action(async (count, options) => {
      await seedUsers(count, options);
    });
    program
   .command("create-admin <name> <email> <password>")
   .description("Create Admin User")
   .action(async (name, email, password) => {
  try {
    await userModel.create({
      name,
      email,
      password,
      role: "admin"
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.log("Error:", err.message);
    process.exit();
  }
});
}