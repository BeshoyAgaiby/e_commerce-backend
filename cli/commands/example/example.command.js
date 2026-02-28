export default function registerExampleCommand(program) {
  program
    .command("example <count>")
    .option("--reset", "Reset old data")
    .description("Example command description")
    .action(async (count, options) => {
      console.log("Count:", count);
      console.log("Options:", options);
    });
}