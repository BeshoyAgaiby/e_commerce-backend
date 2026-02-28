import { faker } from "@faker-js/faker";
import { userModel } from "../../../database/models/user.model.js";
import { categoryModel } from "../../../database/models/category.model.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { subCategoryModel } from "../../../database/models/subCategory.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { reviewModel } from "../../../database/models/review.model.js";
import { couponModel } from "../../../database/models/coupon.model.js";
import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
 


export const seedAll = async (count, options = {}) => {
     count = Number(count);

     if (isNaN(count) || count <= 0) {
       console.log("❌ Please provide valid number");
       process.exit();
     }

     console.log("🚀 Starting Full Database Seeding...\n");

     if (options.reset) {
       await orderModel.deleteMany();
       await cartModel.deleteMany();
       await reviewModel.deleteMany();
       await couponModel.deleteMany();
       await productModel.deleteMany();
       await subCategoryModel.deleteMany();
       await brandModel.deleteMany();
       await categoryModel.deleteMany();
       await userModel.deleteMany();

       console.log("🗑 All old data deleted\n");
     }

      //1️⃣ Users
     console.log("Seeding Users...");
     const admin = await userModel.create({
       name: "Super Admin",
       email: "admin@test.com",
       password: "123456",
       role: "admin"
     });

     const users = [];
     for (let i = 0; i < count; i++) {
       users.push(await userModel.create({
         name: faker.person.fullName(),
         email: faker.internet.email().toLowerCase(),
         password: "123456",
         role: "user"
       }));
     }
     console.log("✅ Users created\n");

     // 2️⃣ Categories
     console.log("Seeding Categories...");
     const categories = [];
     for (let i = 0; i < 5; i++) {
       categories.push(await categoryModel.create({
         name: faker.commerce.department() + "-" + faker.number.int(1000),
         slug: faker.string.alphanumeric(6),
         image: faker.image.urlPicsumPhotos()
       }));
     }
     console.log("✅ Categories created\n");

      //3️⃣ Brands
     console.log("Seeding Brands...");
     const brands = [];
     for (let i = 0; i < 5; i++) {
       brands.push(await brandModel.create({
         name: faker.company.name() + "-" + faker.number.int(1000),
         slug: faker.string.alphanumeric(6),
         logo: faker.image.urlPicsumPhotos(),
         categoryId: faker.helpers.arrayElement(categories)._id
       }));
     }
     console.log("✅ Brands created\n");

      //4️⃣ SubCategories
     console.log("Seeding SubCategories...");
     const subCategories = [];
     for (let i = 0; i < 5; i++) {
       subCategories.push(await subCategoryModel.create({
         name: faker.commerce.productAdjective() + "-" + faker.number.int(1000),
         category: faker.helpers.arrayElement(categories)._id,
         createdBy: admin._id
       }));
     }
     console.log("✅ SubCategories created\n");

      //5️⃣ Products
     console.log("Seeding Products...");
     const products = [];
     for (let i = 0; i < count; i++) {
       products.push(await productModel.create({
         title: faker.commerce.productName() + faker.number.int(1000),
         description: faker.commerce.productDescription(),
         price: faker.number.int({ min: 100, max: 5000 }),
         stock: faker.number.int({ min: 10, max: 100 }),
         category: faker.helpers.arrayElement(categories)._id,
         subCategory: faker.helpers.arrayElement(subCategories)._id,
         brand: faker.helpers.arrayElement(brands)._id,
         userId: admin._id,
         imageCover: faker.image.urlPicsumPhotos()
       }));
     }
     console.log("✅ Products created\n");

      //6️⃣ Reviews
     console.log("Seeding Reviews...");
     for (let i = 0; i < count; i++) {
       await reviewModel.create({
         text: faker.lorem.sentence(),
         userId: faker.helpers.arrayElement(users)._id,
         productId: faker.helpers.arrayElement(products)._id,
         rate: faker.number.int({ min: 1, max: 5 })
       });
     }
     console.log("✅ Reviews created\n");

      //7️⃣ Coupons
     console.log("Seeding Coupons...");
     for (let i = 0; i < 5; i++) {
       await couponModel.create({
         discount: faker.number.int({ min: 5, max: 50 }),
         expires: faker.date.future(),
         code: faker.string.alphanumeric(8).toUpperCase()
       });
     }
     console.log("✅ Coupons created\n");

     console.log("🎉 Full Database Seeded Successfully!");
     process.exit();
   };