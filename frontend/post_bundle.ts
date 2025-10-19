
// import { parseArgs } from "https://deno.land/std@0.208.0/cli/parse_args.ts";

// const args = parseArgs(Deno.args);

// if (args._.length === 0) {
//   console.error("Error: Please provide a file path as an argument");
//   Deno.exit(1);
// }

// const filePath = args._[0] as string;

// try {
//   const fileContent = await Deno.readTextFile(filePath);
//   console.log(`Processing file: ${filePath}`);
  
//   // Add your post-bundle processing logic here
//   // For example:
//   // - Minify the bundled code
//   // - Add license headers
//   // - Generate source maps
//   // - Copy to deployment directory
  
//   console.log("Post-bundle processing completed successfully");
// } catch (error) {
//   console.error(`Error processing file ${filePath}:`, error.message);
//   Deno.exit(1);
// }


if (import.meta.main) {
  console.log('Post bundle script');
  
  //
  // Process index.html
  //
  const filepath = `${Deno.cwd()}\\dist\\index.html`;
  console.log(`Processing: ${filepath}`);

  const isFile = await Deno.stat(filepath).then((stat) => stat.isFile).catch(() => false);

  if (!isFile) {
    console.error(`Error: ${filepath} is not a file`);
    Deno.exit(1);
  }

  const content = await Deno.readTextFile(filepath);
  //console.log(content);

  const newContent = content.replace('<script src=','<script defer src='); // add defer back into script
  Deno.writeTextFile(filepath, newContent);

  console.log('Post bundle script completed successfully');

}