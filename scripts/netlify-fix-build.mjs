/**
 * Fixes stuck Netlify UI publish path for this monorepo:
 *   base = new-tem, publish dir = .next (relative to base)
 *
 * Usage (from repo root):
 *   node scripts/netlify-fix-build.mjs [SITE_ID]
 *
 * Uses your local Netlify CLI login from %APPDATA%/netlify/Config/config.json
 */

import fs from "fs";
import https from "https";
import path from "path";
import os from "os";

const siteId =
  process.argv[2] || "3b3de49f-7a75-43ba-975d-39b1d4cf7d2f";

const configPath = path.join(
  os.homedir(),
  "AppData/Roaming/netlify/Config/config.json"
);

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const userId = config.userId;
const token = config.users?.[userId]?.auth?.token;

if (!token) {
  console.error("Could not read Netlify auth token. Run: npx netlify login");
  process.exit(1);
}

const body = JSON.stringify({
  build_settings: {
    cmd: "npm run build",
    /* Relative to repo root — pairs with netlify.toml publish = "new-tem/.next" */
    dir: "new-tem/.next",
    base: "new-tem",
  },
});

const req = https.request(
  {
    hostname: "api.netlify.com",
    path: `/api/v1/sites/${siteId}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      Authorization: `Bearer ${token}`,
    },
  },
  (res) => {
    let data = "";
    res.on("data", (c) => {
      data += c;
    });
    res.on("end", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`OK (${res.statusCode}) — build_settings updated.`);
      } else {
        console.error(`Error ${res.statusCode}:`, data);
        process.exit(1);
      }
    });
  }
);

req.on("error", (e) => {
  console.error(e);
  process.exit(1);
});

req.write(body);
req.end();
