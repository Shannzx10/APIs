const express = require('express');
const cors = require('cors');
const { requestan, requestanID, requestanUrl, createRoute } = require('./func')
const { thinkany, tudouai, useadrenaline, GoodyAI, luminai, blackbox, CgtAi, Simsimi, leptonAi, yousearch, LetmeGpt, AoyoAi } = require('./scrape/ai');
const { PlayStore, apkcombo, aptoide, BukaLapak, happymod, stickersearch, filmapik21, webtoons, resep, gore, mangatoon, android1, wattpad } = require('./scrape/search');
const { tiktok, tiktokAll, ttStalker, ttSlide, instagram } = require('./scrape/downloader');
const config = require('./config');
const msg = config.messages;
const app = express();
const PORT = process.env.PORT || 3000;

app.set('json spaces', 4);

let totalRequests = 0;
let totalVisitors = 0;
const visitors = new Set();

app.use(cors());

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
app.get('/search/apkcombo', requestan(apkcombo.search));
app.get('/search/aptoide', requestan(aptoide.search));

app.get('/downloader/aptoide', requestanID(aptoide.download));
app.get('/downloader/tiktok', requestanUrl(tiktok));
app.get('/downloader/tiktokAll', requestanUrl(tiktokAll));
app.get('/downloader/ttslide', requestan(ttSlide));
app.get('/download/ttstalk', requestan(ttStalker));
app.get('/downloader/instagram', requestanUrl(instagram));

createRoute('writetext', 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html');
createRoute('blackpinklogo', 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html');
createRoute('glitchtext', 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html');
createRoute('advancedglow', 'https://en.ephoto360.com/advanced-glow-effects-74.html');
createRoute('typographytext', 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html');
createRoute('pixelglitch', 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html');
createRoute('neonglitch', 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html');
createRoute('flag', 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html');
createRoute('flag2', 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html');
createRoute('deletingtext', 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html');
createRoute('blackpinkstyle', 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html');
createRoute('glowingtext', 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html');
createRoute('underwater', 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html');
createRoute('logomaker', 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html');
createRoute('cartoonstyle', 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html');
createRoute('papercut', 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html');
createRoute('watercolor', 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html');
createRoute('effectclouds', 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html');
createRoute('gradienttext', 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html');
createRoute('summerbeach', 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html');
createRoute('luxurygold', 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html');
createRoute('multicolored', 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html');
createRoute('sandsummer', 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html');
createRoute('galaxy', 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html');
createRoute('1917style', 'https://en.ephoto360.com/1917-style-text-effect-523.html');
createRoute('makingneon', 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html');
createRoute('royaltext', 'https://en.ephoto360.com/royal-text-effect-online-free-471.html');
createRoute('texteffect', 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html');
createRoute('galaxystyle', 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html');
createRoute('lighteffect', 'https://en.ephoto360.com/create-light-effects-green-neon-online-429.html');

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Author: ${config.author}`);
});