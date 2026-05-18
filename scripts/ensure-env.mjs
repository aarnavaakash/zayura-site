import { copyFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const envFiles = [
  ["server/.env.example", "server/.env"],
  ["client/.env.example", "client/.env"]
];

for (const [example, target] of envFiles) {
  const targetPath = path.join(root, target);

  try {
    await access(targetPath);
  } catch {
    await copyFile(path.join(root, example), targetPath);
    console.log(`Created ${target} from ${example}`);
  }
}
