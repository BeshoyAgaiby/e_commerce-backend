import { faker } from "@faker-js/faker";
import { orderModel } from "../../../database/models/order.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { productModel } from "../../../database/models/product.model.js";

export const seedOrders = async (count, options = {}) => {
   count = Number(count);

    if (isNaN(count) || count <= 0) {
      console.log("❌ Please provide valid number");
      process.exit();
    }

    if (options.reset) {
      await orderModel.deleteMany();
      console.log("Old orders deleted 🗑");
    }

    const users = await userModel.find({ role: "user" });
    const products = await productModel.find();

    if (!users.length || !products.length) {
      console.log("⚠ Seed users and products first");
      process.exit();
    }

    for (let i = 0; i < count; i++) {

      const randomUser = faker.helpers.arrayElement(users);

      const randomProducts = faker.helpers.arrayElements(products, {
        min: 1,
        max: 3
      });

      const orderItems = randomProducts.map(product => {
        const quantity = faker.number.int({ min: 1, max: 3 });

        return {
          productId: product._id,
          quantity,
          price: product.price,
          title: product.title,
          imageCover: product.imageCover
        };
      });

      const totalOrderPrice = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const statusOptions = ["pending","paid","processing","shipped","delivered"];
      const status = faker.helpers.arrayElement(statusOptions);

      const orderData = {
        userId: randomUser._id,
        orderItems,
        totalOrderPrice,
        shippingAddress: {
          details: faker.location.streetAddress(),
          city: faker.location.city(),
          phone: faker.phone.number("01#########")
        },
        paymentMethod: faker.helpers.arrayElement(["cash", "card"]),
        status
      };

      if (status === "paid" || status === "processing" || status === "shipped" || status === "delivered") {
        orderData.paidAt = faker.date.recent();
      }

      if (status === "delivered") {
        orderData.deliveredAt = faker.date.recent();
      }

      await orderModel.create(orderData);
    }

    console.log(`✅ ${count} orders generated successfully`);
    process.exit();
  };