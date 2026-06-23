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

let load, save;

if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const ready = pool.query(
    'CREATE TABLE IF NOT EXISTS app_data (id INT PRIMARY KEY, data JSONB NOT NULL)'
  ).then(() => console.log('Postgres ready')).catch(e => console.error('Postgres init error', e));

  load = async () => {
    await ready;
    try {
      const r = await pool.query('SELECT data FROM app_data WHERE id = 1');
      return r.rows[0]?.data || {};
    } catch (e) { console.error('load error', e); return {}; }
  };

  save = async (data) => {
    await ready;
    try {
      await pool.query(
        'INSERT INTO app_data (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = $1',
        [data]
      );
    } catch (e) { console.error('save error', e); }
  };
} else {
  const DATA_FILE = fs.existsSync('/data') ? '/data/data.json' : path.join(__dirname, 'data.json');
  console.log('No DATABASE_URL — falling back to file storage at', DATA_FILE);

  load = async () => {
    try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return {}; }
  };

  save = async (data) => {
    try { fs.writeFileSync(DATA_FILE, JSON.stringify(data)); } catch (e) { console.error('save error', e); }
  };
}

async function getKey(key, fallback) { const d = await load(); return d[key] ?? fallback; }
async function setKey(key, val) { const d = await load(); d[key] = val; await save(d); }

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/all', async (req, res) => {
  const d = await load();
  const lists = ['TAC 100', 'TAC 295 Big Spray', 'TAC 295 Small Spray', 'Trails', 'Parks'];
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
