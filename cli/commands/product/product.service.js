import { faker } from "@faker-js/faker";
import slugify from "slugify";
 import { productModel } from "../../../database/models/product.model.js";
 import { categoryModel } from "../../../database/models/category.model.js";
 import { subCategoryModel } from "../../../database/models/subCategory.model.js";
 import { brandModel } from "../../../database/models/brand.model.js";
 import { userModel } from "../../../database/models/user.model.js";

export const seedProducts = async (count) => {
    const categories = await categoryModel.find();
    const subCategories = await subCategoryModel.find();
    const brands = await brandModel.find();
    const admin = await userModel.findOne({ role: "admin" });

    if (!categories.length || !subCategories.length || !brands.length || !admin) {
      console.log("⚠ لازم يكون عندك category + subCategory + brand + admin موجودين");
      process.exit();
    }

    const products = [];

    for (let i = 0; i < count; i++) {

      const randomCategory = faker.helpers.arrayElement(categories);
      const randomSubCategory = faker.helpers.arrayElement(subCategories);
      const randomBrand = faker.helpers.arrayElement(brands);

      const title = faker.commerce.productName() + faker.number.int(1000);

      products.push({
        title,
        slug: slugify(title),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 1000, max: 50000 }),
        priceAfterDiscount: faker.number.int({ min: 500, max: 40000 }),
        rateAvg: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        rateCount: faker.number.int({ min: 0, max: 200 }),
        stock: faker.number.int({ min: 1, max: 100 }),
        sold: faker.number.int({ min: 0, max: 50 }),
        category: randomCategory._id,
        subCategory: randomSubCategory._id,
        brand: randomBrand._id,
        userId: admin._id,
        imageCover: faker.image.url(),
        images: [faker.image.url(), faker.image.url()]
      });
    }

    await productModel.deleteMany();
    await productModel.insertMany(products);

    console.log(` ${count} Products Generated Successfully`);
    process.exit();
  }
