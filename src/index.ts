import Yargs from "yargs";
import * as docker_image from "./docker_image";
const yargs = Yargs(process.argv.slice(2)).help().version(false).alias("h", "help").wrap(Yargs.terminalWidth());

// List tags
yargs.command("list", "list tags", async yargs => {
  const options = yargs.parseSync();
  const info = await docker_image.getTags(options._[1] as string);
  console.log(info.tags.slice(0, 25).join("\n"));
  return;
});

// Install Package
yargs.command("install", "Install packages", async yargs => {
  const options = yargs.options("force", {alias: "f", type: "boolean", default: false}).parseSync();
  const [, ...packagesNames] = options._;
  await docker_image.downloadBlobs(packagesNames[0] as string).then(res => console.log("'%o'", res));
  return;
});

// Run CLI
yargs.command({command: "*", handler: () => {Yargs.showHelp();}}).parseAsync();