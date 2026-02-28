import { seedReviews } from "./review.service.js";

export default function registerReviewCommand(program) {
  program
    .command("seed-reviews <count>")
    .option("--reset", "Delete old reviews first")
    .description("Generate reviews linked to users and products")
    .action(async (count, options) => {
      await seedReviews(count, options);
    });
}