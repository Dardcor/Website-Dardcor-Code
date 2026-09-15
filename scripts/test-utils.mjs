// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PROJECT_ROOT = path.resolve(__dirname, '..');

// ANSI Color formatting
export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

export const symbols = {
  pass: '✔',
  fail: '✖',
  info: 'ℹ',
  warn: '⚠',
  bullet: '•',
};

// File system helpers
export function fileExists(relPath) {
  const fullPath = path.resolve(PROJECT_ROOT, relPath);
  return fs.existsSync(fullPath);
}

export function readFile(relPath) {
  const fullPath = path.resolve(PROJECT_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relPath} (resolved: ${fullPath})`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

export function listSourceFiles(dir = 'src', extensions = ['.ts', '.tsx', '.html', '.css']) {
  const results = [];
  const fullDir = path.resolve(PROJECT_ROOT, dir);
  if (!fs.existsSync(fullDir)) return results;

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
          walk(entryPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          results.push(path.relative(PROJECT_ROOT, entryPath).replace(/\\/g, '/'));
        }
      }
    }
  }

  walk(fullDir);
  return results;
}

// Shell execution helper
export function execCommand(command, options = {}) {
  return new Promise((resolve) => {
    exec(command, { cwd: PROJECT_ROOT, timeout: 60000, ...options }, (error, stdout, stderr) => {
      resolve({
        code: error && typeof error.code === 'number' ? error.code : (error ? 1 : 0),
        stdout: (stdout || '').toString(),
        stderr: (stderr || '').toString(),
      });
    });
  });
}

// Custom Assertion Engine
export class TestAssertionError extends Error {
  constructor(message, details = null) {
    super(message);
    this.name = 'TestAssertionError';
    this.details = details;
  }
}

export const assert = {
  ok(value, message) {
    if (!value) {
      throw new TestAssertionError(message || 'Expected truthy value, received falsy');
    }
  },
  equal(actual, expected, message) {
    if (actual !== expected) {
      throw new TestAssertionError(
        message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
        { actual, expected }
      );
    }
  },
  includes(target, search, message) {
    if (typeof target !== 'string' || !target.includes(search)) {
      throw new TestAssertionError(
        message || `Target string does not contain expected substring: "${search}"`
      );
    }
  },
  notIncludes(target, search, message) {
    if (typeof target === 'string' && target.includes(search)) {
      throw new TestAssertionError(
        message || `Target string unexpectedly contains forbidden substring: "${search}"`
      );
    }
  },
  matches(target, regex, message) {
    if (typeof target !== 'string' || !regex.test(target)) {
      throw new TestAssertionError(
        message || `Target string does not match regular expression: ${regex}`
      );
    }
  },
  doesNotMatch(target, regex, message) {
    if (typeof target === 'string' && regex.test(target)) {
      throw new TestAssertionError(
        message || `Target string unexpectedly matches forbidden regular expression: ${regex}`
      );
    }
  },
  fileExists(relPath, message) {
    if (!fileExists(relPath)) {
      throw new TestAssertionError(
        message || `Expected file "${relPath}" to exist in project repository`
      );
    }
  },
  fileContains(relPath, search, message) {
    const content = readFile(relPath);
    if (!content.includes(search)) {
      throw new TestAssertionError(
        message || `File "${relPath}" does not contain expected pattern: "${search}"`
      );
    }
  },
  fileMatches(relPath, regex, message) {
    const content = readFile(relPath);
    if (!regex.test(content)) {
      throw new TestAssertionError(
        message || `File "${relPath}" does not match pattern: ${regex}`
      );
    }
  },
  gte(actual, expected, message) {
    if (actual < expected) {
      throw new TestAssertionError(
        message || `Expected ${actual} >= ${expected}`
      );
    }
  },
};

// Code Analysis Helpers
export const analysis = {
  /**
   * Find external links in code and verify rel="noopener noreferrer"
   */
  auditExternalLinks(content, filePath) {
    const violations = [];
    // Match <a ... href="http..." or href='http...'
    const anchorRegex = /<a\b([^>]*?)href=["'](https?:\/\/[^"']+)["']([^>]*?)>/gi;
    let match;
    while ((match = anchorRegex.exec(content)) !== null) {
      const fullAttrs = (match[1] + ' ' + match[3]).toLowerCase();
      const url = match[2];

      // Ignore localhost or relative schema
      if (url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')) {
        continue;
      }

      // Check if rel attribute contains both noopener and noreferrer
      const relMatch = fullAttrs.match(/rel=["']([^"']*)["']/);
      if (!relMatch) {
        violations.push({
          url,
          reason: 'Missing rel attribute entirely',
          attrs: fullAttrs.trim(),
        });
      } else {
        const relValue = relMatch[1];
        const hasNoopener = relValue.includes('noopener');
        const hasNoreferrer = relValue.includes('noreferrer');
        if (!hasNoopener || !hasNoreferrer) {
          violations.push({
            url,
            rel: relValue,
            reason: `rel="${relValue}" must include BOTH "noopener" and "noreferrer"`,
            attrs: fullAttrs.trim(),
          });
        }
      }
    }
    return violations;
  },

  /**
   * Check for inline event handlers like onclick="", onload="", onerror="" in HTML or string attributes
   */
  auditInlineHandlers(content) {
    // In raw HTML or string attributes, check for on\w+=["']
    const inlineHandlerRegex = /\s(on[a-z]{3,12})=["'][^"']*["']/gi;
    const matches = [];
    let match;
    while ((match = inlineHandlerRegex.exec(content)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  },

  /**
   * Parse exported default function name from TSX/TS file
   */
  extractDefaultExport(content) {
    const match = content.match(/export\s+default\s+(?:function\s+([A-Za-z0-9_]+)|([A-Za-z0-9_]+))/);
    return match ? (match[1] || match[2]) : null;
  },

  /**
   * Check responsive classes in TSX section component
   */
  auditResponsiveLayout(content) {
    const hasResponsivePadding = /px-4\s+sm:px-[68]/i.test(content) || /px-\d+\s+(?:sm|md|lg):px-\d+/i.test(content);
    const hasResponsiveGridOrFlex = /(?:grid-cols-1|flex-col|flex-wrap|sm:grid-cols|md:grid-cols|lg:grid-cols|lg:flex-row)/i.test(content);
    const hasUnconstrainedFixedWideWidth = /w-\[(?:[4-9]\d\d|\d{4,})px\](?!.*max-w-)/i.test(content);
    return {
      hasResponsivePadding,
      hasResponsiveGridOrFlex,
      hasUnconstrainedFixedWideWidth,
    };
  },

  /**
   * Check security headers content
   */
  parseHeadersFile(content) {
    const lines = content.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && !l.startsWith('/*'));
    const headers = {};
    for (const line of lines) {
      const idx = line.indexOf(':');
      if (idx > 0) {
        const key = line.slice(0, idx).trim().toLowerCase();
        const value = line.slice(idx + 1).trim();
        headers[key] = value;
      }
    }
    return headers;
  },
};

// Test Registry
class TestRegistry {
  constructor() {
    this.tests = [];
  }

  register({ id, name, tier, milestone, area, fn }) {
    if (!id || !name || !tier || !milestone || !area || typeof fn !== 'function') {
      throw new Error(`Invalid test registration: ${JSON.stringify({ id, name, tier, milestone, area })}`);
    }
    this.tests.push({ id, name, tier, milestone, area, fn });
  }

  getTests(filter = {}) {
    return this.tests.filter((t) => {
      if (filter.tier && t.tier !== Number(filter.tier)) return false;
      if (filter.milestone && t.milestone.toUpperCase() !== filter.milestone.toUpperCase()) return false;
      if (filter.area && !t.area.toLowerCase().includes(filter.area.toLowerCase())) return false;
      if (filter.search && !`${t.id} ${t.name}`.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    });
  }
}

export const registry = new TestRegistry();
