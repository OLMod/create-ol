#!/usr/bin/env node
import inquirer from 'inquirer'
import { cp, readFile, writeFile } from 'fs/promises';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

(async()=>{
async function prompt() {
    /**
     * @type {{ plugName: string, authorName: string, authorId: number, plugDesc: string }}
     */
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "plugName",
            message: "What do you want your plugin to be called?",
            default: "MyOLPlugin"
        },
        {
            type: "input",
            name: "authorName",
            message: "What's your name?",
        },
        {
            type: "number",
            name: "authorId",
            message: "What's your Discord ID? (Settings > Advanced > Developer Mode: True, click your username in the bottom left, click Copy User ID)",
        },
        {
            type: "input",
            name: "plugDesc",
            message: "What do you want your plugin's description to be?"
        }
    ]);
    return {
        "Plug.Name": answers.plugName,
        "Author.Name": answers.authorName,
        "Author.ID": answers.authorId,
        "Plug.Desc": answers.plugDesc,
    };
}

const replacements = await prompt();

await cp(__dirname + "/../plugin/", "./", { recursive: true });

let contents = await readFile("./src/main.ts", "utf-8");

Object.keys(replacements).forEach(k => contents = contents.replaceAll(`&OL.${k}`, replacements[k]));

await writeFile("./src/main.ts", contents);

console.log("Run `pnpm i` and `pnpm dev` to run your new plugin!")
})();