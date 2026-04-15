// check if /data have db.json if not replace from current folder
import fs from "fs";
import { copyFile } from "fs/promises";
import path from "path";
function fileExists() {
  return fs.existsSync(path.join("/", "data", "db.json"));
}
function init() {
  const shouldReplace = !fileExists() || process.env.FORCE_RESET === "TRUE";
  if (shouldReplace) {
    copyFile("./db.json", path.join("/", "data", "db.json"));
  }
}
init();
