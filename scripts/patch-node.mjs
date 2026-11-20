import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// 1. Patch vite/dist/node/chunks/node.js for parseEnv
const viteChunkPath = path.join(root, "node_modules/vite/dist/node/chunks/node.js");
if (fs.existsSync(viteChunkPath)) {
  let content = fs.readFileSync(viteChunkPath, "utf-8");
  const target = 'import { format, formatWithOptions, inspect, parseEnv, promisify, stripVTControlCharacters } from "node:util";';
  if (content.includes(target)) {
    const replacement = `import * as utilMod from "node:util";\nconst { format, formatWithOptions, inspect, promisify, stripVTControlCharacters } = utilMod;\nconst parseEnv = utilMod.parseEnv || (() => ({}));`;
    content = content.replace(target, replacement);
    fs.writeFileSync(viteChunkPath, content, "utf-8");
    console.log("Patched vite for Node 20.11 parseEnv");
  }
}

// 2. Patch rolldown for styleText
const rolldownDir = path.join(root, "node_modules/rolldown/dist/shared");
if (fs.existsSync(rolldownDir)) {
  const files = fs.readdirSync(rolldownDir);
  for (const file of files) {
    if (file.endsWith(".mjs")) {
      const filePath = path.join(rolldownDir, file);
      let content = fs.readFileSync(filePath, "utf-8");
      const target = 'import { formatWithOptions, styleText } from "node:util";';
      if (content.includes(target)) {
        const replacement = `import nodeUtil from "node:util";\nconst formatWithOptions = nodeUtil.formatWithOptions;\nconst styleText = nodeUtil.styleText || ((_f, t) => t);`;
        content = content.replace(target, replacement);
        fs.writeFileSync(filePath, content, "utf-8");
        console.log(`Patched ${file} for Node 20.11 styleText`);
      }
    }
  }
}
