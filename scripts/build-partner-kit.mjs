// Builds public/resources/endo-brand-kit.zip from the logo files listed in content/partners.ts, plus a
// colours.txt with the brand hex codes. Runs before `npm run dev` and `npm run build`, so the zip
// always matches the files. The PNGs are already compressed, so files are stored rather than deflated,
// which keeps this free of dependencies.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const RESOURCES = join(ROOT, "public/resources");
const content = readFileSync(join(ROOT, "content/partners.ts"), "utf8");

const section = (name) => content.slice(content.indexOf(`export const ${name}`), content.indexOf("] as const;", content.indexOf(`export const ${name}`)));
const logoFiles = [...section("LOGO_FILES").matchAll(/file: "([^"]+)"/g)].map((match) => match[1]);
const colours = [...section("BRAND_COLOURS").matchAll(/name: "([^"]+)", hex: "([^"]+)", use: "([^"]+)"/g)].map(([, name, hex, use]) => `${name}  ${hex}  (${use})`);
const zipName = content.match(/BRAND_KIT_ZIP = "([^"]+)"/)?.[1] ?? "endo-brand-kit.zip";

const files = [
  ...logoFiles.map((file) => ({ name: `endo-brand-kit/${file}`, data: readFileSync(join(RESOURCES, file)) })),
  { name: "endo-brand-kit/colours.txt", data: Buffer.from(`endo brand colours\n\n${colours.join("\n")}\n\nAlways write endo in lowercase.\n`) },
];

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buffer) => {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

// A fixed timestamp (2026-01-01) so the zip only changes when the files do.
const DOS_TIME = 0;
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;

const local = [];
const central = [];
let offset = 0;
for (const file of files) {
  const name = Buffer.from(file.name);
  const crc = crc32(file.data);
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0x0800, 6);
  header.writeUInt16LE(0, 8);
  header.writeUInt16LE(DOS_TIME, 10);
  header.writeUInt16LE(DOS_DATE, 12);
  header.writeUInt32LE(crc, 14);
  header.writeUInt32LE(file.data.length, 18);
  header.writeUInt32LE(file.data.length, 22);
  header.writeUInt16LE(name.length, 26);
  local.push(header, name, file.data);

  const entry = Buffer.alloc(46);
  entry.writeUInt32LE(0x02014b50, 0);
  entry.writeUInt16LE(20, 4);
  entry.writeUInt16LE(20, 6);
  entry.writeUInt16LE(0x0800, 8);
  entry.writeUInt16LE(0, 10);
  entry.writeUInt16LE(DOS_TIME, 12);
  entry.writeUInt16LE(DOS_DATE, 14);
  entry.writeUInt32LE(crc, 16);
  entry.writeUInt32LE(file.data.length, 20);
  entry.writeUInt32LE(file.data.length, 24);
  entry.writeUInt16LE(name.length, 28);
  entry.writeUInt32LE(offset, 42);
  central.push(entry, name);
  offset += header.length + name.length + file.data.length;
}
const centralSize = central.reduce((sum, part) => sum + part.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralSize, 12);
end.writeUInt32LE(offset, 16);

writeFileSync(join(RESOURCES, zipName), Buffer.concat([...local, ...central, end]));
console.log(`Built public/resources/${zipName} (${files.length} files)`);
