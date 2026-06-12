const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'spraylog.db');
const db = new Database(DB_PATH);

app.use(express.json({ limit: '2mb' }));
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

db.exec(`
  CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
`);

const getSetting = db.prepare('SELECT value FROM settings WHERE key = ?');
const setSetting = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');

function getJSON(key, fallback) {
  const row = getSetting.get(key);
  return row ? JSON.parse(row.value) : fallback;
}

function setJSON(key, val) {
  setSetting.run(key, JSON.stringify(val));
}

// ── Job lists ─────────────────────────────────────────────────────────────────
app.get('/api/job-lists', (req, res) => {
  res.json(getJSON('job-lists', {}));
});

app.put('/api/job-lists', (req, res) => {
  setJSON('job-lists', req.body);
  res.json({ ok: true });
});

// ── Chemical defaults ─────────────────────────────────────────────────────────
app.get('/api/chem-defaults', (req, res) => {
  res.json(getJSON('chem-defaults', {}));
});

app.put('/api/chem-defaults', (req, res) => {
  setJSON('chem-defaults', req.body);
  res.json({ ok: true });
});

// ── Completed logs ────────────────────────────────────────────────────────────
app.get('/api/logs', (req, res) => {
  res.json(getJSON('logs', []));
});

app.put('/api/logs', (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Expected array' });
  setJSON('logs', req.body);
  res.json({ ok: true });
});

// ── Pending (per list) ────────────────────────────────────────────────────────
app.get('/api/pending/:list', (req, res) => {
  res.json(getJSON('pending-' + req.params.list, []));
});

app.put('/api/pending/:list', (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Expected array' });
  setJSON('pending-' + req.params.list, req.body);
  res.json({ ok: true });
});

// ── Load all state in one round-trip ──────────────────────────────────────────
app.get('/api/all', (req, res) => {
  const lists = ['TAC 100', 'TAC 295 Big Spray', 'TAC 295 Small Spray', 'Trails'];
  const pending = {};
  lists.forEach(l => { pending[l] = getJSON('pending-' + l, []); });
  res.json({
    jobLists:     getJSON('job-lists', {}),
    chemDefaults: getJSON('chem-defaults', {}),
    logs:         getJSON('logs', []),
    pending,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Spray Log running → http://localhost:${PORT}`));
