import { seedOrders } from "./order.service.js";

export default function registerOrderCommand(program) {
  program
    .command("seed-orders <count>")
    .option("--reset", "Delete old orders first")
    .description("Generate random orders")
    .action(async (count, options) => {
      await seedOrders(count, options);
    });
}