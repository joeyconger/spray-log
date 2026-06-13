console.log('Starting server...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT env:', process.env.PORT);

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = fs.existsSync('/data') ? '/data/data.json' : path.join(__dirname, 'data.json');
console.log('PORT:', PORT);
console.log('DATA_FILE:', DATA_FILE);
console.log('__dirname:', __dirname);

app.use(express.json({ limit: '2mb' }));
app.use('/public', express.static(path.join(__dirname, 'public')));

function load() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return {}; }
}

function save(data) {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(data)); } catch(e) { console.error('save error', e); }
}

function getKey(key, fallback) { return load()[key] ?? fallback; }
function setKey(key, val) { const d = load(); d[key] = val; save(d); }

app.get('/',                (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/all',         (req, res) => {
  const d = load();
  const lists = ['TAC 100', 'TAC 295 Big Spray', 'TAC 295 Small Spray', 'Trails', 'Parks'];
  const pending = {};
  lists.forEach(l => { pending[l] = d['pending-' + l] || []; });
  res.json({ jobLists: d['job-lists'] || {}, chemDefaults: d['chem-defaults'] || {}, logs: d['logs'] || [], pending });
});
app.get('/api/job-lists',   (req, res) => res.json(getKey('job-lists', {})));
app.put('/api/job-lists',   (req, res) => { setKey('job-lists', req.body); res.json({ ok: true }); });
app.get('/api/chem-defaults', (req, res) => res.json(getKey('chem-defaults', {})));
app.put('/api/chem-defaults', (req, res) => { setKey('chem-defaults', req.body); res.json({ ok: true }); });
app.get('/api/logs',        (req, res) => res.json(getKey('logs', [])));
app.put('/api/logs',        (req, res) => { setKey('logs', req.body); res.json({ ok: true }); });
app.get('/api/pending/:list', (req, res) => res.json(getKey('pending-' + req.params.list, [])));
app.put('/api/pending/:list', (req, res) => { setKey('pending-' + req.params.list, req.body); res.json({ ok: true }); });

app.listen(PORT, '0.0.0.0', () => console.log('Listening on port ' + PORT));
