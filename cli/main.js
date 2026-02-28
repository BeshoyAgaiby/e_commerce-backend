#!/usr/bin/env node

import { Command } from "commander";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";

import registerExampleCommand from "./commands/example/example.command.js";
import registerBrandCommand from "./commands/brand/brand.command.js";
import registerCartCommand from "./commands/cart/cart.command.js";
import registerCategoryCommand from "./commands/category/category.command.js";
import registerSubCategoryCommand from "./commands/subCategory/subCategory.command.js";
import registerCouponCommand from "./commands/coupon/coupon.command.js";
import registerOrderCommand from "./commands/order/order.command.js";
import registerReviewCommand from "./commands/review/review.command.js";
import registerUserCommand from "./commands/user/user.command.js";
import registerProductCommand from "./commands/product/product.command.js";
import registerAllCommand from "./commands/allComands/all.command.js";

dotenv.config();

const program = new Command();

await connectDB();

// 👇 هنا بنمرر program
registerExampleCommand(program);
registerBrandCommand(program);
registerCartCommand(program);
registerCategoryCommand(program);
registerSubCategoryCommand(program);
registerCouponCommand(program);
registerOrderCommand(program);
registerReviewCommand(program);
registerUserCommand(program);
registerProductCommand(program);
registerAllCommand(program);

program.parse();