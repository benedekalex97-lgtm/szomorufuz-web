// Helyi Vercel-emulátor QA-hoz: a .vercel/output/config.json routingját követi
// (fejlécek, átirányítások, statikus fájlok, szerverfüggvény, 404), és a LEFORDÍTOTT
// szerverfüggvényt hívja – így a tesztek a ténylegesen telepítendő kimenetet vizsgálják.
// Csak helyi használatra (127.0.0.1); semmit nem küld ki.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const OUT = resolve('.vercel/output');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

function staticFile(pathname) {
  const base = join(OUT, 'static', decodeURIComponent(pathname));
  for (const f of [base, join(base, 'index.html')]) {
    if (existsSync(f) && statSync(f).isFile()) return f;
  }
  return null;
}

export async function startServer({ port = 0, env = {} } = {}) {
  if (!existsSync(join(OUT, 'config.json')))
    throw new Error('Nincs .vercel/output – futtasd: npm run build');
  const config = JSON.parse(readFileSync(join(OUT, 'config.json'), 'utf8'));
  Object.assign(process.env, env);
  const fnDir = join(OUT, 'functions/_render.func');
  const vc = JSON.parse(readFileSync(join(fnDir, '.vc-config.json'), 'utf8'));
  const fn = (await import(pathToFileURL(join(fnDir, vc.handler)).href)).default;

  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const headers = {};
    try {
      for (const route of config.routes) {
        if (route.handle === 'filesystem') {
          const file = staticFile(path);
          if (file) {
            res.writeHead(200, {
              ...headers,
              'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
            });
            res.end(readFileSync(file));
            return;
          }
          continue;
        }
        if (!route.src) continue;
        const m = new RegExp(route.src).exec(path);
        if (!m) continue;
        const sub = (s) => s.replace(/\$(\d+)/g, (_, i) => m[Number(i)] ?? '');
        if (route.headers) for (const [k, v] of Object.entries(route.headers)) headers[k] = sub(v);
        if (route.continue) continue;
        if (route.status && headers.Location) {
          res.writeHead(route.status, headers);
          res.end();
          return;
        }
        if (route.dest === '_render') {
          const chunks = [];
          for await (const c of req) chunks.push(c);
          const request = new Request(url, {
            method: req.method,
            headers: [
              ...Object.entries(req.headers).filter(([, v]) => typeof v === 'string'),
              ['x-forwarded-for', req.socket.remoteAddress ?? '127.0.0.1'],
            ],
            body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
          });
          const response = await fn.fetch(request);
          const out = { ...headers };
          response.headers.forEach((v, k) => (out[k] = v));
          res.writeHead(response.status, out);
          res.end(Buffer.from(await response.arrayBuffer()));
          return;
        }
        if (route.dest && route.status) {
          const file = staticFile(route.dest);
          res.writeHead(route.status, { ...headers, 'Content-Type': TYPES['.html'] });
          res.end(file ? readFileSync(file) : '');
          return;
        }
        // Csak „src” (pl. /.well-known): továbbengedjük a következő szabályhoz.
      }
      res.writeHead(404, headers);
      res.end('Not found');
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(String(e));
    }
  });
  await new Promise((r) => server.listen(port, '127.0.0.1', r));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

// Közvetlen futtatás: node scripts/qa/vercel-local.mjs [port]
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const { base } = await startServer({ port: Number(process.argv[2] ?? 4322) });
  console.log(`Helyi Vercel-emulátor: ${base}`);
}
