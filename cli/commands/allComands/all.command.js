import { seedAll } from "./all.service.js";

export default function registerAllCommand(program) { 
   program
    .command("seed-all <count>")
    .option("--reset", "Delete all data first")
    .description("Seed full database in correct order")
    .action(async (count, options) => {
     await seedAll(count, options);
    });
   }