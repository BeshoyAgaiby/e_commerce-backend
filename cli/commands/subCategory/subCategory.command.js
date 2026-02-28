import { seedSubCategories } from "./subCategory.service.js";

export default function registerSubCategoryCommand(program) {
  program
    .command("seed-subcategories <count>")
    .option("--reset", "Delete old subcategories first")
    .description("Generate subcategories linked to categories and users")
    .action(async (count, options) => {
      await seedSubCategories(count, options);
    });
}