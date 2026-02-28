import { categoryModel } from "../../../database/models/category.model.js";
import { faker } from "@faker-js/faker";
import slugify from "slugify";

export const seedCategory = async (count, options = {}) => {
  count = Number(count);

  if (isNaN(count) || count <= 0) {
    console.log("❌ Please provide valid number");
    process.exit();
  }

  if (options.reset) {
    await categoryModel.deleteMany();
    console.log("Old categories deleted 🗑");
  }

  const categories = [];
  const usedNames = new Set();

  for (let i = 0; i < count; i++) {
    let name;

    do {
      name = faker.commerce.department() + "-" + faker.number.int(1000);
    } while (usedNames.has(name));

    usedNames.add(name);

    categories.push({
      name: name.trim(),
      slug: slugify(name, { lower: true, strict: true }),
      image: faker.image.urlPicsumPhotos()
    });
  }

  try {
    await categoryModel.insertMany(categories);
    console.log(`✅ ${count} categories inserted successfully`);
  } catch (err) {
    console.log("❌ Error:", err.message);
  }

  process.exit();
};