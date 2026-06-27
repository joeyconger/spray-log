console.log('Starting server...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT env:', process.env.PORT);
console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
console.log('PORT:', PORT);
console.log('__dirname:', __dirname);

app.use(express.json({ limit: '2mb' }));
app.use('/public', express.static(path.join(__dirname, 'public')));

let getKey, setKey, loadAll;

if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const ready = pool.query(
    'CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value JSONB NOT NULL)'
  ).then(() => console.log('Postgres ready')).catch(e => console.error('Postgres init error', e));

  // Each key lives in its own row with its own atomic upsert, so concurrent
  // writes to different keys can never clobber each other (no read-modify-write
  // of a shared blob).
  getKey = async (key, fallback) => {
    await ready;
    try {
      const r = await pool.query('SELECT value FROM kv WHERE key = $1', [key]);
      return r.rows[0]?.value ?? fallback;
    } catch (e) { console.error('getKey error', e); return fallback; }
  };

  setKey = async (key, val) => {
    await ready;
    try {
      await pool.query(
        'INSERT INTO kv (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
        [key, val]
      );
    } catch (e) { console.error('setKey error', e); }
  };

  loadAll = async (keys) => {
    await ready;
    try {
      const r = await pool.query('SELECT key, value FROM kv WHERE key = ANY($1)', [keys]);
      const out = {};
      r.rows.forEach(row => { out[row.key] = row.value; });
      return out;
    } catch (e) { console.error('loadAll error', e); return {}; }
  };
} else {
  const DATA_FILE = fs.existsSync('/data') ? '/data/data.json' : path.join(__dirname, 'data.json');
  console.log('No DATABASE_URL — falling back to file storage at', DATA_FILE);

  const readFile = () => { try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return {}; } };
  const writeFile = (d) => { try { fs.writeFileSync(DATA_FILE, JSON.stringify(d)); } catch (e) { console.error('save error', e); } };

  getKey = async (key, fallback) => readFile()[key] ?? fallback;
  setKey = async (key, val) => { const d = readFile(); d[key] = val; writeFile(d); };
  loadAll = async (keys) => { const d = readFile(); const out = {}; keys.forEach(k => { if (k in d) out[k] = d[k]; }); return out; };
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/all', async (req, res) => {
  const lists = ['TAC 100', 'TAC 295 Big Spray', 'TAC 295 Small Spray', 'Trails', 'Parks'];
  const pendingKeys = lists.map(l => 'pending-' + l);
  const d = await loadAll(['job-lists', 'chem-defaults', 'logs', ...pendingKeys]);
  const pending = {};
  lists.forEach(l => { pending[l] = d['pending-' + l] || []; });
  res.json({ jobLists: d['job-lists'] || {}, chemDefaults: d['chem-defaults'] || {}, logs: d['logs'] || [], pending });
});
app.get('/api/job-lists',     async (req, res) => res.json(await getKey('job-lists', {})));
app.put('/api/job-lists',     async (req, res) => { await setKey('job-lists', req.body); res.json({ ok: true }); });
app.get('/api/chem-defaults', async (req, res) => res.json(await getKey('chem-defaults', {})));
app.put('/api/chem-defaults', async (req, res) => { await setKey('chem-defaults', req.body); res.json({ ok: true }); });
app.get('/api/logs',          async (req, res) => res.json(await getKey('logs', [])));
app.put('/api/logs',          async (req, res) => { await setKey('logs', req.body); res.json({ ok: true }); });
app.get('/api/pending/:list', async (req, res) => res.json(await getKey('pending-' + req.params.list, [])));
app.put('/api/pending/:list', async (req, res) => { await setKey('pending-' + req.params.list, req.body); res.json({ ok: true }); });

app.listen(PORT, '0.0.0.0', () => console.log('Listening on port ' + PORT));
