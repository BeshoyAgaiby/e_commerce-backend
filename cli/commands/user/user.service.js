import { faker } from "@faker-js/faker";
import { userModel } from "../../../database/models/user.model.js";
export const seedUsers = async (count, options = {}) => {
  count = Number(count);

  if (isNaN(count) || count <= 0) {
    console.log("❌ Please provide valid number");
    process.exit();
  }

  if (options.reset) {
    await userModel.deleteMany();
    console.log("Old users deleted 🗑");
  }

  // 1️⃣ إنشاء Admin ثابت
  const existingAdmin = await userModel.findOne({ role: "admin" });

  if (!existingAdmin) {
    await userModel.create({
      name: "Beshoy Agaiby",
      email: "beshoyagaiby1@gmail.com",
      password: "bb123456",
      role: "admin",
    });

    console.log("Admin created ✅");
  } else {
    console.log("Admin already exists ⚠");
  }

  // 2️⃣ إنشاء Users عشوائيين
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: "123456", // هيتعمله hash تلقائي
      role: "user",
    });
  }

  for (const user of users) {
    try {
      await userModel.create(user); // عشان middleware يشتغل
    } catch (err) {
      // لو حصل تكرار ايميل نتجاهله
    }
  }

  console.log(`✅ ${count} users generated successfully`);
  process.exit();
};
