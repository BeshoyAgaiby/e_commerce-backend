import { seedBrands } from "./brand.service.js";

export default function registerBrandCommand(program) {
  program
    .command("seed-brands <count>")
    .option("--reset", "Delete old brands first")
    .description("Generate brands with category relation")
    .action(async (count, options) => {
      seedBrands(count, options);
    });
} 