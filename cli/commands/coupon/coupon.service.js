import { faker } from "@faker-js/faker";
import { couponModel } from "../../../database/models/coupon.model.js";

export const seedCoupons = async (count, options = {}) => {
  count = Number(count);

  if (isNaN(count) || count <= 0) {
    console.log("❌ Please provide valid number");
    process.exit();
  }

  if (options.reset) {
    await couponModel.deleteMany();
    console.log("Old coupons deleted 🗑");
  }

  const coupons = [];
  const usedCodes = new Set();

  for (let i = 0; i < count; i++) {
    let code;
    do {
      code = faker.string.alphanumeric(8).toUpperCase();
    } while (usedCodes.has(code));

    usedCodes.add(code);

    coupons.push({
      discount: faker.number.int({ min: 5, max: 70 }), // خصم من 5% لـ 70%
      expires: faker.date.future(), // تاريخ في المستقبل
      code,
    });
  }

  try {
    await couponModel.insertMany(coupons);
    console.log(`✅ ${count} coupons inserted successfully`);
  } catch (err) {
    console.log("❌ Error:", err.message);
  }

  process.exit();
};
