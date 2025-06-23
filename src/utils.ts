import * as cheerio from 'cheerio';
import { Element, Text, Node } from 'domhandler';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Logs objects or arrays to a JSON file with TypeScript support
 * @param filePath Path to the JSON file
 * @param data Data to log (object or array)
 * @param options Configuration options
 */
function logToJsonFile<T extends object | object[]>(
  filePath: string,
  data: T,
  options: {
    append?: boolean;
    dir?: string;
    pretty?: boolean;
  } = { append: true, dir: './logs', pretty: true }
): void {
  const { append = true, dir = './logs', pretty = true } = options;
  const fullPath = join(dir, filePath);

  try {
    // Ensure directory exists
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    let existingData: object[] = [];

    // Read existing data if appending
    if (append && existsSync(fullPath)) {
      const fileContent = readFileSync(fullPath, 'utf8');
      existingData = fileContent ? JSON.parse(fileContent) : [];
      
      // Normalize to array if needed
      if (!Array.isArray(existingData)) {
        existingData = [existingData];
      }
    }

    // Handle new data (array or single object)
    const newData = Array.isArray(data) ? [...data] : [data];
    const combinedData = [...existingData, ...newData];

    // Write to file with optional pretty print
    writeFileSync(
      fullPath,
      JSON.stringify(combinedData, null, pretty ? 2 : undefined)
    );

    console.log(`Data successfully written to ${fullPath}`);
  } catch (error) {
    console.error('Error writing to JSON file:', error instanceof Error ? error.message : error);
  }
}
/**
 * Extract AF_initDataCallback scripts from raw HTML.
 */
export function extractScriptData(html: string): Record<string, any> {
  const scripts: Record<string, any> = {};

  const regex = />AF_initDataCallback\((.*?)\);<\/script/s;
  const matches = Array.from(html.matchAll(new RegExp(regex, 'g')));

  for (const match of matches) {
    const item = match[0];

    const keyMatch = item.match(/(ds:.*?)'/);
    const valueMatch = item.match(/data:([\s\S]*?)(, }\);<\/|, sideChannel:)/);

    if (keyMatch && valueMatch) {
      const key = keyMatch[1];
      const jsonRaw = valueMatch[1];

      try {
        scripts[key] = JSON.parse(jsonRaw);
      } catch {
        console.log("error in json ")
        throw new Error("error in json")
      }
    }
  }

  return scripts;
}

/**
 * Convert HTML string to plain text.
 */
export function html2text(html: string): string {
  const $ = cheerio.load(html);
  const body = $('body').get(0);
  const text = convertNodeToText(body);
  return text.replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Recursively convert DOM node to formatted text.
 */
function convertNodeToText(node: Node | undefined): string {
  if (!node) return '';

  if (isTextNode(node)) {
    return node.data.replace(/\s+/, ' ');
  }

  if (isElementNode(node)) {
    let text = '';
    for (const child of node.children ?? []) {
      text += convertNodeToText(child);
    }

    switch (node.tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'p':
      case 'ul':
      case 'div':
        text = `\n\n${text}\n\n`;
        break;
      case 'li':
        text = `- ${text}\n`;
        break;
      case 'br':
        text += '\n';
        break;
    }

    return text;
  }

  return '';
}

/**
 * Deep property access via string or path array.
 */
export function getValue<T = any>(
  object: Record<string, any>,
  path: string | string[],
  glue = '.'
): T | null {
  const keys = Array.isArray(path) ? path : path.split(glue);
  let ref: any = object;

  for (const key of keys) {
    if (typeof ref === 'object' && ref !== null && key in ref) {
      ref = ref[key];
    } else {
      return null;
    }
  }

  return ref;
}

/**
 * Type guards
 */
function isTextNode(node: Node): node is Text {
  return node.type === 'text';
}

function isElementNode(node: Node): node is Element {
  return node.type === 'tag';
}

/**
 * Extract developer information from Google Play HTML.
 */
export function extractDeveloper(html: string, developerId: string): {
  ids: string[];
  name: string;
} {
  const ds3 = getScriptDataInfo(html, developerId);

  const name = ds3?.[0]?.[1]?.[0]?.[22]?.[1]?.[0] ?? '';
  const apps = ds3?.[0]?.[1]?.[0]?.[22]?.[0] ?? [];
  const ids = apps.map((app:any)=>app?.[0]?.[0]?.[0])

  return {
    ids: ids,
    name,
  };
}

/**
 * Extract relevant script data array from raw HTML.
 */
function getScriptDataInfo(html: string, developerId: string): any {
  const scriptData = extractScriptData(html);

  const ds3 = scriptData['ds:3'];
  if (!ds3) {
    throw new Error(`Developer data (ds:3) not found for ID "${developerId}".`);
  }

  return ds3;
}