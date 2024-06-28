const express = require('express');
const cors = require('cors'); 
const cron = require('node-cron');
const { thinkany, tudouai, useadrenaline, GoodyAI, luminai, blackbox, CgtAi, Simsimi, leptonAi, yousearch, LetmeGpt, AoyoAi } = require('./scrape/ai');
const { PlayStore, BukaLapak, happymod, stickersearch, filmapik21, webtoons, resep, gore, mangatoon, android1, wattpad } = require('./scrape/search');
const { ephoto } = require('./scrape/ephoto');
const config = require('./config');
const msg = config.messages;
const app = express();
const PORT = process.env.PORT || 3000;

app.set('json spaces', 4);

let totalRequests = 0;
let totalVisitors = 0;
const visitors = new Set();

const corsOptions = {
    origin: 'https://api-shannmoderz.github.io',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    totalRequests++;
    if (req.path === '/') {
        const visitorIP = req.ip;
        if (!visitors.has(visitorIP)) {
            visitors.add(visitorIP);
            totalVisitors++;
        }
    }
    next();
});

app.get('/', (req, res) => {
    res.redirect('https://api-shannmoderz.github.io');
});

app.get('/stats', (req, res) => {
    res.json({
        status: true,
        code: 200,
        author: config.author,
        result: {
            totalRequests,
            totalVisitors
        }
    });
});

const Ephoto = (link) => async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ status: false, code: 400, author: config.author, result: msg.query });
    }
    try {
        const result = await ephoto(link, query);
        res.redirect(result)
    } catch (error) {
        res.status(500).json({ status: false, code: 500, author: config.author, result: msg.error });
    }
};

const requestan = (aiFunction) => async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ status: false, code: 400, author: config.author, result: msg.query });
    }
    try {
        const result = await aiFunction(query);
        res.json({ status: true, code: 200, author: config.author, result: result });
    } catch (error) {
        res.status(500).json({ status: false, code: 500, author: config.author, result: msg.error });
    }
};

app.get('/ai/tudou', async (req, res) => {
    const query = req.query.query
    const prompt = req.query.prompt
    if (!query) {
        return res.status(400).json({ status: false, code: 400, author: config.author, result: msg.query });
    }
    if (!prompt) {
        return res.status(400).json({ status: false, code: 400, author: config.author, result: msg.prompt });
    }
    try {
        const result = await tudouai(query, prompt);
        res.json({ status: true, code: 200, author: config.author, result: result });
    } catch (error) {
        res.status(500).json({ status: false, code: 500, author: config.author, result: msg.error });
    }
});

app.get('/ai/claude', requestan(thinkany));
app.get('/ai/goody', requestan(GoodyAI));
app.get('/ai/luminai', requestan(luminai));
app.get('/ai/blackbox', requestan(blackbox));
app.get('/ai/cgt', requestan(CgtAi));
app.get('/ai/simsimi', requestan(Simsimi));
app.get('/ai/lepton', requestan(leptonAi));
app.get('/ai/yousearch', requestan(yousearch));
app.get('/ai/letmegpt', requestan(LetmeGpt));
app.get('/ai/aoyo', requestan(AoyoAi));
app.get('/ai/prod', requestan(useadrenaline));
app.get('/search/playstore', requestan(PlayStore));
app.get('/search/bukalapak', requestan(BukaLapak));
app.get('/search/happymod', requestan(happymod));
app.get('/search/stickersearch', requestan(stickersearch));
app.get('/search/filmapik21', requestan(filmapik21));
app.get('/search/webtoons', requestan(webtoons));
app.get('/search/cariresep', requestan(resep));
app.get('/search/seegore', requestan(gore));
app.get('/search/mangatoon', requestan(mangatoon));
app.get('/search/wattpad', requestan(wattpad));
app.get('/search/android1', requestan(android1));
app.get('/maker/blackpinklogo', Ephoto('https://en.ephoto360.com/create-blackpink-logo-online-free-607.html')

app.get('/endpoint', (req, res) => {
  const endpoints = [];
  app._router.stack.forEach((layer) => {
    if (layer.route) {
      const methods = [];
      for (const method in layer.route.methods) {
        methods.push(method.toUpperCase());
      }
      endpoints.push({
        path: layer.route.path,
        methods: methods,
      });
    }
  });
  res.json(endpoints);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: false, code: 500, author: config.author, result: msg.error });
});

cron.schedule('0 0 * * *', () => {
  totalRequests = 0;
  totalVisitors = 0;
  visitors.clear();
  console.log('Resetting counters...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Author: ${config.author}`);
});