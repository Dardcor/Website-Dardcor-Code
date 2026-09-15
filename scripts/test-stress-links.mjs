import https from 'node:https';

const urls = [
  'https://github.com/Dardcor',
  'https://twitter.com/dardcor',
  'https://youtube.com/@dardcor',
  'https://github.com/Dardcor/Dardcor-Code',
  'https://github.com/Dardcor/Dardcor-Code/releases',
  'https://github.com/Dardcor/Dardcor-Code/blob/main/LICENSE',
  'https://github.com/Dardcor/Dardcor-Code#readme'
];

console.log('Testing URL syntax and resolution for external links:');
for (const u of urls) {
  try {
    const parsed = new URL(u);
    console.log(`✔ [Valid URL] ${parsed.protocol}//${parsed.host}${parsed.pathname}${parsed.hash}`);
  } catch (e) {
    console.error(`✖ [Invalid URL] ${u}: ${e.message}`);
  }
}
