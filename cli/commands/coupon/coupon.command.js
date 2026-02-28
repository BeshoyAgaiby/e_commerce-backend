import { seedCoupons } from "./coupon.service.js";

export default function registerCouponCommand(program) {
  program
    .command("seed-coupons <count>")
    .option("--reset", "Delete old coupons first")
    .description("Generate random coupons")
    .action(async (count, options) => {
      await seedCoupons(count, options);
    });
}