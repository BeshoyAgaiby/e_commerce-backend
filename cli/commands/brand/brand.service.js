import { Command } from "commander";
import { brandModel } from "../../../database/models/brand.model.js";
import { categoryModel } from "../../../database/models/category.model.js";
import { faker } from "@faker-js/faker";
import slugify from "slugify";

export const seedBrands = async (count, options = {}) => {
      count = Number(count);

      if (isNaN(count) || count <= 0) {
        console.log("❌ Please provide valid number");
        process.exit();
      }

      if (options.reset) {
        await brandModel.deleteMany();
        console.log("Old brands deleted 🗑");
      }

      const categories = await categoryModel.find();

      if (!categories.length) {
        console.log("⚠ No categories found. Seed categories first.");
        process.exit();
      }

      const brands = [];
      const usedNames = new Set();

      for (let i = 0; i < count; i++) {
        let name;
        do {
          name = faker.company.name() + "-" + faker.number.int(1000);
        } while (usedNames.has(name));

        usedNames.add(name);

        const randomCategory = faker.helpers.arrayElement(categories);

        brands.push({
          name: name.trim(),
          slug: slugify(name, { lower: true, strict: true }),
          logo: faker.image.urlPicsumPhotos(), // مطابق لحقل logo
          categoryId: randomCategory._id, // ربط بالـ category
        });
      }

      try {
        
        await brandModel.insertMany(brands);
        console.log(`✅ ${count} brands inserted successfully`);
      } catch (err) {
        console.log("❌ Error:", err.message);
      }

      process.exit();
    }

