import { faker } from "@faker-js/faker";
import { reviewModel } from "../../../database/models/review.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { productModel } from "../../../database/models/product.model.js";

export const seedReviews = async (count, options = {}) => {
  count = Number(count);

  if (isNaN(count) || count <= 0) {
    console.log(" Please provide valid number");
    process.exit();
  }

  if (options.reset) {
    await reviewModel.deleteMany();
    console.log("Old reviews deleted 🗑");
  }

  const users = await userModel.find({ role: "user" });
  const products = await productModel.find();

  if (!users.length) {
    console.log("⚠ No users found. Seed users first.");
    process.exit();
  }

  if (!products.length) {
    console.log("⚠ No products found. Seed products first.");
    process.exit();
  }

  const reviews = [];

  for (let i = 0; i < count; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    const randomProduct = faker.helpers.arrayElement(products);

    reviews.push({
      text: faker.lorem.sentence(),
      userId: randomUser._id,
      productId: randomProduct._id,
      rate: faker.number.int({ min: 1, max: 5 }),
    });
  }

  try {
    await reviewModel.insertMany(reviews);
    console.log(`✅ ${count} reviews inserted successfully`);
  } catch (err) {
    console.log("❌ Error:", err.message);
  }

  process.exit();
};
