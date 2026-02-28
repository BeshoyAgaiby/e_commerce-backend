import { seedCarts } from "./cart.service.js";

export default function registerCartCommand(program) {
  program
    .command("seed-carts")
    .option("--reset", "Delete old carts first")
    .description("Generate carts for users")
    .action(async (options) => {
     await seedCarts(options);
    });
}