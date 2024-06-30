const express = require('express');
const app = express();
const config = require('./config');
const msg = config.messages;
const { ephoto } = require('./scrape/ephoto')

const createRoute = (path, url) => {
  app.get(`/ephoto360/${path}`, async (req, res) => {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ status: false, code: 400, author: config.author, result: msg.query });
    }
    try {
      const result = await ephoto(url, query);
      res.redirect(result);
    } catch (error) {
      res.status(500).json({ status: false, code: 500, author: config.author, result: msg.error });
    }
  });
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

const requestanID = (aiFunction) => async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ status: false, code: 400, author: config.author, result: msg.id });
    }
    try {
        const result = await aiFunction(id);
        res.json({ status: true, code: 200, author: config.author, result: result });
    } catch (error) {
        res.status(500).json({ status: false, code: 500, author: config.author, result: msg.error });
    }
};

const requestanUrl = (aiFunction) => async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ status: false, code: 400, author: config.author, result: msg.url });
    }
    try {
        const result = await aiFunction(url);
        res.json({ status: true, code: 200, author: config.author, result: result });
    } catch (error) {
        res.status(500).json({ status: false, code: 500, author: config.author, result: msg.error });
    }
};

module.exports = { requestan, requestanID, requestanUrl, createRoute };