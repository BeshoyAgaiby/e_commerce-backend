
import { faker } from "@faker-js/faker";
import { couponModel } from "../../../database/models/coupon.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { cartModel } from "../../../database/models/cart.model.js";

export const seedCarts = async ( options = {}) => {
    if (options.reset) {
      await cartModel.deleteMany();
      console.log("Old carts deleted 🗑");
    }

    const users = await userModel.find({ role: "user" });
    const products = await productModel.find();
    const coupons = await couponModel.find();

    if (!users.length || !products.length) {
      console.log("⚠ Seed users and products first");
      process.exit();
    }

    for (const user of users) {

      // لأن عندك unique: true على userId
      const existingCart = await cartModel.findOne({ userId: user._id });
      if (existingCart) continue;

      const randomProducts = faker.helpers.arrayElements(products, {
        min: 1,
        max: 3
      });

      const cartItems = randomProducts.map(product => ({
        productId: product._id,
        quantity: faker.number.int({ min: 1, max: 3 }),
        price: product.price
      }));

      const cartData = {
        userId: user._id,
        products: cartItems
      };

      // نضيف كوبون عشوائي لو موجود
      if (coupons.length && faker.datatype.boolean()) {
        const randomCoupon = faker.helpers.arrayElement(coupons);
        cartData.coupon = randomCoupon._id;
      }

      await cartModel.create(cartData); // 👈 عشان pre("save") يشتغل
    }

    console.log("✅ Carts generated successfully");
    process.exit();
  };