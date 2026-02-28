import { seedProducts } from "./product.service.js";

export default function registerProductCommand(program) {
  program
    .command("seed-products <count>")
    .description("Generate random products with relations")
    .action(async (count) => {
      await seedProducts(count);
    });
}