import { seedCategory } from "./category.service.js";

export default function registerCategoryCommand(program) {
  program
    .command("seed-categories <count>")
    .option("--reset", "Delete old categories first")
    .description("Generate categories")
    .action(async (count, options) => {
      await seedCategory(count, options);
    });
}