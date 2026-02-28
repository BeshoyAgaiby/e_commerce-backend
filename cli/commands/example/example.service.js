export const exampleService = async (count, options = {}) => {
  count = Number(count);

  if (isNaN(count) || count <= 0) {
    console.log("❌ Invalid number");
    return;
  }

  if (options.reset) {
    console.log("Resetting old data...");
  }

  console.log(`Generating ${count} items...`);
};