/**
 * @description The bin builder for node.js cli packages.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

const fs = require('fs');

async function buildBin() {
  const methodName = process.argv[3];
  const binPath = './bin';
  const mode = 0o777;

  const content = `#!/usr/bin/env node

require('../lib')${methodName == null ? '' : `.${methodName}`};`;

  if (fs.existsSync(binPath)) {
    fs.rmSync(binPath, { recursive: true, force: true });
  }

  fs.mkdirSync(binPath);
  fs.writeFileSync(`${binPath}/index.js`, content, { mode });

  return 'The "bin" directory has been created.';
}

module.exports = buildBin;
