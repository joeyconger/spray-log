const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const DATA_PATH = process.env.DB_PATH
  ? path.join(path.dirname(process.env.DB_PATH), 'data.json')
  : path.join(__dirname, 'data.json');

app.use(express.json({ limit: '2mb' }));
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

function load() {
  try { return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')); } catch { return {}; }
}

function save(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data), 'utf8');
}

function getKey(key, fallback) {
  return load()[key] ?? fallback;
}

function setKey(key, val) {
  const data = load();
  data[key] = val;
  save(data);
}

// ── Job lists ─────────────────────────────────────────────────────────────────
app.get('/api/job-lists', (req, res) => res.json(getKey('job-lists', {})));
app.put('/api/job-lists', (req, res) => { setKey('job-lists', req.body); res.json({ ok: true }); });

// ── Chemical defaults ─────────────────────────────────────────────────────────
app.get('/api/chem-defaults', (req, res) => res.json(getKey('chem-defaults', {})));
app.put('/api/chem-defaults', (req, res) => { setKey('chem-defaults', req.body); res.json({ ok: true }); });

// ── Completed logs ────────────────────────────────────────────────────────────
app.get('/api/logs', (req, res) => res.json(getKey('logs', [])));
app.put('/api/logs', (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Expected array' });
  setKey('logs', req.body);
  res.json({ ok: true });
});

// ── Pending (per list) ────────────────────────────────────────────────────────
app.get('/api/pending/:list', (req, res) => res.json(getKey('pending-' + req.params.list, [])));
app.put('/api/pending/:list', (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Expected array' });
  setKey('pending-' + req.params.list, req.body);
  res.json({ ok: true });
});

// ── Load all state in one round-trip ──────────────────────────────────────────
app.get('/api/all', (req, res) => {
  const data = load();
  const lists = ['TAC 100', 'TAC 295 Big Spray', 'TAC 295 Small Spray', 'Trails'];
  const pending = {};
  lists.forEach(l => { pending[l] = data['pending-' + l] || []; });
  res.json({
    jobLists:     data['job-lists']     || {},
    chemDefaults: data['chem-defaults'] || {},
    logs:         data['logs']          || [],
    pending,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Spray Log running on port ${PORT}`));
