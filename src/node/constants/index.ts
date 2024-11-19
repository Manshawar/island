import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PACKAGE_ROOT = join(__dirname, '..');
export const CLIENT_ENTRY_PATH = join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "client-entry.tsx"
);

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");

export const SERVER_ENTRY_PATH = join(PACKAGE_ROOT, "src", "runtime", "ssr-entry.tsx");
export const MD_REGEX = /\.mdx?$/;
export const MASK_SPLITTER = '!!ISLAND!!';