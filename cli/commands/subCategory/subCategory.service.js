import { faker } from "@faker-js/faker";
import { subCategoryModel } from "../../../database/models/subCategory.model.js";
import { categoryModel } from "../../../database/models/category.model.js";
import { userModel } from "../../../database/models/user.model.js";


export const seedSubCategories = async (count, options = {}) => {
    count = Number(count);

    if (isNaN(count) || count <= 0) {
      console.log("❌ Please provide valid number");
      process.exit();
    }

    if (options.reset) {
      await subCategoryModel.deleteMany();
      console.log("Old subcategories deleted 🗑");
    }

    const categories = await categoryModel.find();
    const admin = await userModel.findOne({ role: "admin" });

    if (!categories.length) {
      console.log("⚠ No categories found. Seed categories first.");
      process.exit();
    }

    if (!admin) {
      console.log("⚠ No admin found. Seed users first.");
      process.exit();
    }

    const subCategories = [];
    const usedNames = new Set();

    for (let i = 0; i < count; i++) {

      let name;
      do {
        name = faker.commerce.productAdjective() + "-" + faker.number.int(1000);
      } while (usedNames.has(name));

      usedNames.add(name);

      const randomCategory = faker.helpers.arrayElement(categories);

      subCategories.push({
        name: name.trim(),
        category: randomCategory._id,
        createdBy: admin._id
      });
    }

    try {
      await subCategoryModel.insertMany(subCategories);
      console.log(`✅ ${count} subcategories inserted successfully`);
    } catch (err) {
      console.log("❌ Error:", err.message);
    }

    process.exit();
  }