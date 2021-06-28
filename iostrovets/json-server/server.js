const express = require('express');
const fs = require('fs').promises;
const jsonServer = require('json-server');
const path = require('path');
const sharp = require('sharp');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const db = require('./db.json');
const { verifyToken, generateAccessToken } = require('./auth');

const server = jsonServer.create();
const router = jsonServer.router('json-server/db.json');
const middlewares = jsonServer.defaults();

dotenv.config();

server.use('/static', express.static(path.join(__dirname, 'public')));
server.use(middlewares);
server.use(verifyToken);
server.use(jsonServer.bodyParser);

server.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = db.users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) return res.sendStatus(401);

  res.json(generateAccessToken(user.id));
});

server.get('/profile', async (req, res) => {
  const token = req.headers.authorization;

  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = db.users.find(({ id }) => JSON.stringify(id) === userId);

    res.json(user);
  } catch (error) {
    res.sendStatus(401);
  }
});

server.post('/post-image/:postId', async (req, res) => {
  const imageName = `image-${req.params.postId}.png`;
  const imagePath = `json-server/public/images/${imageName}`;

  const thumbnailName = `thumbnail-${req.params.postId}.png`;
  const thumbnailPath = `json-server/public/thumbnails/${thumbnailName}`;

  await fs.writeFile(imagePath, Buffer.from(req.body));

  const thumbnail = await sharp(imagePath).resize(150, 150);
  await thumbnail.toFile(thumbnailPath);

  const url = `${req.protocol}://${req.get('host')}`;

  res.send({
    url: `${url}/static/images/${imageName}`,
    thumbnailUrl: `${url}/static/thumbnails/${thumbnailName}`,
  });
});

server.use(router);

server.listen(3000, () => {
  console.log('\nJSON Server is running at http://localhost:3000/\n');
  console.log('Resources:');

  for (const [resource, data] of Object.entries(router.db.__wrapped__)) {
    console.log(`/${resource} - ${data.length}`);
  }
});
